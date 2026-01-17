# Формат темы (runtime-реализация)

Этот документ описывает **фактическую** систему темы в текущем коде. Сейчас тема применяется **в рантайме** через JS и установку CSS‑переменных, а не через готовые CSS‑файлы тем.

## Что является темой сейчас

- **Тема = набор JS‑токенов + overrides**, применяемых в `applyDocumentTheme()`.
- CSS‑переменные выставляются функцией `updateCSSVariablesFromTokens()`.
- CSS‑файлы тем из `src/EXTENSIONS/themes/` сейчас **не используются** в рантайме.

**Кодовая база:**
- `src/FOUNDATION/theme/applyMode.ts`
- `src/FOUNDATION/theme/ThemeProvider.tsx`
- `src/themes/*` (описания тем и брендов)

## Атрибуты DOM

Текущая схема атрибутов на `<html>`:

- `data-mode`: `day | night`
- `data-theme-name`: `default | dark | brand`
- `data-theme`: дублирует `data-mode` (используется как вторичный атрибут)

Это соответствует текущей логике в `applyMode.ts`.

## Где задаются значения токенов

`updateCSSVariablesFromTokens(mode)` выставляет CSS‑переменные на `document.documentElement`:

- **Legacy базовые переменные:** `--background`, `--foreground`, `--card`, `--popover`, `--border`, `--ring`, и т.д.
- **Surface/Text/Semantic группы:** `--surface-*`, `--text-*`, `--semantic-*`, `--chart-*`
- **Цветовые шкалы:** `--primary-*`, `--secondary-*`, `--accent-*`
- **Semantic TM‑токены (частично):** `--tm-primary`, `--tm-primary-foreground`, `--tm-secondary`, `--tm-accent`, `--tm-disabled`, `--tm-disabled-foreground`

Полный список выставляемых переменных находится в:
- `src/FOUNDATION/theme/applyMode.ts`

## Источники токенов

Токены берутся из JS‑объектов в `src/FOUNDATION/tokens/*` и могут быть переопределены темой:

- `src/FOUNDATION/tokens/colors.ts`
- `src/FOUNDATION/tokens/motion/v2`
- `src/FOUNDATION/tokens/spacing.ts`
- `src/FOUNDATION/tokens/radius.ts`
- `src/FOUNDATION/tokens/shadows.ts`
- `src/FOUNDATION/tokens/typography.ts`

## Темы и бренды

Текущие темы и бренды находятся в `src/themes`:

- `src/themes/default.ts`
- `src/themes/dark.ts`
- `src/themes/brand.ts`
- `src/themes/neon.ts`
- `src/themes/minimal.ts`

`ThemeProvider` регистрирует бренды и умеет применять бренд‑оверрайды через `brand_engine`.

## Реестр required-tokens.ts

`src/FOUNDATION/tokens/required-tokens.ts` — **реестр для tooling/контракта**, а не для текущего runtime.
На данный момент рантайм **не выставляет полный список** `--tm-*` токенов из реестра.

## Быстрый пример использования

```ts
import { ThemeProvider } from "@/FOUNDATION/theme";

// ThemeProvider управляет data-mode/data-theme-name и применяет CSS переменные
```

```html
<html data-mode="day" data-theme="day" data-theme-name="default"></html>
```

## Проверка факта

Если нужно подтвердить текущую схему:

- `src/FOUNDATION/theme/applyMode.ts`
- `src/FOUNDATION/theme/ThemeProvider.tsx`
- `src/themes/*`
