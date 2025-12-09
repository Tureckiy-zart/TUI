# TUI_200_DOCS_V3_CODE_REVIEW_FULL_AUDIT - Отчёт

**Дата аудита:** 2025-12-08  
**Версия документации:** 3.0.0  
**Статус:** Полный аудит завершён

## Резюме

Проведён полный аудит системы документации `docs-app/`, созданной в рамках TUI_200. Выявлено **23 проблемы**, из которых:

- **Критичных:** 6
- **Высокий приоритет:** 8
- **Средний приоритет:** 6
- **Низкий приоритет:** 3

## Критичные проблемы (блокируют production)

### ARCH-01-CRITICAL-1: Прямые импорты из src/ вместо опубликованного пакета

**Файлы:**

- `docs-app/app/tokens/colors/page.tsx` (строка 11)
- `docs-app/app/tokens/typography/page.tsx` (строка 5)
- `docs-app/app/tokens/spacing/page.tsx` (строка 5)
- `docs-app/app/tokens/radius/page.tsx` (строка 5)
- `docs-app/app/tokens/shadows/page.tsx` (строка 10)
- `docs-app/app/tokens/motion/page.tsx` (строка 14)

**Проблема:** Все 6 страниц токенов импортируют напрямую из `../../../../src/tokens/` вместо использования опубликованного пакета `@tenerife.music/ui/tokens`.

**Последствия:**

- Нарушение архитектурной независимости
- Невозможность работы в production (пути не существуют после сборки)
- Нарушение принципа использования только публичных API

**FIX:**

```typescript
// Было:
import { primaryColors } from "../../../../src/tokens/colors";

// Должно быть:
import { primaryColors } from "@tenerife.music/ui/tokens";
```

### ARCH-01-CRITICAL-2: Неполная реализация поиска

**Файл:** `docs-app/lib/search/index.ts`

**Проблема:** Функция `search()` возвращает пустые результаты, потому что:

1. Индекс никогда не инициализируется с документами
2. Документы не хранятся для маппинга ID → результат
3. `initSearchIndex()` никогда не вызывается

**Последствия:**

- Поиск полностью не работает
- Функциональность поиска отсутствует

**FIX:**

```typescript
// Добавить хранение документов
let documents: SearchResult[] = [];

export function initSearchIndex(docs: SearchResult[]): void {
  documents = docs;
  index = new FlexSearch.Index({...});
  documents.forEach((doc, id) => {
    index?.add(id, `${doc.title} ${doc.content || ""} ${doc.category}`);
  });
}

export function search(query: string, limit = 10): SearchResult[] {
  if (!index || documents.length === 0) return [];
  const results = index.search(query, { limit });
  return results.map((id) => documents[id]).filter(Boolean);
}
```

### ROUTING-02-CRITICAL-3: Placeholder компонентная страница

**Файл:** `docs-app/app/components/[component]/page.tsx`

**Проблема:** Страница является заглушкой и не загружает сгенерированные MDX файлы.

**Последствия:**

- Все ссылки на компоненты ведут на placeholder
- Документация компонентов недоступна

**FIX:** Реализовать загрузку сгенерированных MDX файлов:

```typescript
import { notFound } from "next/navigation";
import { readFileSync } from "fs";
import { join } from "path";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function ComponentPage({ params }: { params: { component: string } }) {
  const mdxPath = join(process.cwd(), "app/components", params.component, "page.mdx");

  if (!existsSync(mdxPath)) {
    notFound();
  }

  const source = readFileSync(mdxPath, "utf-8");
  // Рендеринг MDX...
}
```

### API-GEN-05-CRITICAL-4: Парсер не извлекает default values

**Файл:** `docs-app/lib/autodocs/parser.ts`

**Проблема:** Функция `extractProps()` не извлекает значения по умолчанию из props интерфейсов.

**Последствия:**

- API таблицы не показывают default values
- Неполная документация компонентов

**FIX:** Добавить извлечение default values из:

- Default parameters функций
- Default variants в CVA
- JSDoc `@default` теги

### API-GEN-05-CRITICAL-5: Неправильные пути в скрипте генерации

**Файл:** `docs-app/scripts/generate-api-docs.ts` (строка 17)

**Проблема:** Используется относительный путь `../src/components`, который может не работать в зависимости от рабочей директории.

**Последствия:**

- Скрипт может не найти компоненты
- Генерация документации может падать

**FIX:**

```typescript
// Использовать абсолютные пути или path.resolve
const COMPONENTS_DIR = path.resolve(__dirname, "../../src/components");
const OUTPUT_DIR = path.resolve(process.cwd(), "app/components");
```

### PLAYGROUND-06-CRITICAL-6: Sandpack использует нерабочую версию пакета

**Файл:** `docs-app/components/docs/LiveExample.tsx` (строка 25)

**Проблема:** Используется `"@tenerife.music/ui": "latest"`, что не будет работать в Sandpack, так как пакет не опубликован в npm.

**Последствия:**

- Live примеры не работают
- Ошибки при загрузке зависимостей

**FIX:** Использовать локальный пакет или опубликовать в npm:

```typescript
// Вариант 1: Использовать workspace protocol (если поддерживается)
"@tenerife.music/ui": "workspace:*"

// Вариант 2: Использовать опубликованную версию
"@tenerife.music/ui": "^1.0.3"
```

## Высокий приоритет (нужно исправить)

### MDX-03-HIGH-1: MDX файлы на самом деле TSX

**Файлы:**

- `docs-app/app/theming/page.mdx`
- `docs-app/app/architecture/page.mdx`
- `docs-app/app/accessibility/page.mdx`
- `docs-app/app/motion/page.mdx`

**Проблема:** Файлы с расширением `.mdx` на самом деле являются TypeScript/React компонентами, а не настоящими MDX файлами.

**Последствия:**

- Нельзя использовать чистый Markdown синтаксис
- Ограниченная гибкость в написании документации

**FIX:** Либо переименовать в `.tsx`, либо переписать как настоящие MDX файлы с использованием Markdown синтаксиса.

### ROUTING-02-HIGH-2: Отсутствие метаданных на страницах

**Проблема:** Только `layout.tsx` имеет метаданные. Отдельные страницы не имеют собственных метаданных для SEO.

**FIX:** Добавить `export const metadata` в каждую страницу:

```typescript
export const metadata: Metadata = {
  title: "Component Name - Tenerife UI",
  description: "Component description",
};
```

### SSR-08-HIGH-3: Использование navigator.clipboard в клиентских компонентах

**Файлы:**

- `docs-app/components/docs/CodeBlock.tsx` (строка 22)
- `docs-app/components/docs/TokenExplorer.tsx` (строка 41)

**Проблема:** `navigator.clipboard` используется без проверки на доступность (SSR).

**Последствия:**

- Потенциальные ошибки при SSR
- Не работает без HTTPS

**FIX:** Добавить проверку:

```typescript
const handleCopy = async () => {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
};
```

### A11Y-07-HIGH-4: Недостаточные ARIA атрибуты

**Проблема:** ARIA атрибуты присутствуют только в некоторых компонентах. Отсутствуют:

- `aria-label` для навигации
- `aria-current` для активных ссылок
- `aria-expanded` для выпадающих меню
- `role` атрибуты где необходимо

**FIX:** Добавить ARIA атрибуты во все интерактивные компоненты.

### A11Y-07-HIGH-5: Отсутствие keyboard navigation для Search

**Файл:** `docs-app/components/docs/Search.tsx`

**Проблема:** Результаты поиска не навигируются с клавиатуры (стрелки, Enter, Escape).

**FIX:** Добавить обработку клавиатурных событий:

```typescript
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "ArrowDown") {
    // Навигация вниз
  } else if (e.key === "ArrowUp") {
    // Навигация вверх
  } else if (e.key === "Enter") {
    // Выбор результата
  } else if (e.key === "Escape") {
    setIsOpen(false);
  }
};
```

### TOKENS-04-HIGH-6: Hardcoded fallback цвет

**Файл:** `docs-app/app/tokens/colors/page.tsx` (строка 16)

**Проблема:** Используется hardcoded `"#000000"` как fallback.

**FIX:** Использовать токен:

```typescript
import { semanticColors } from "@tenerife.music/ui/tokens";

if (!match) return semanticColors[mode].foreground; // или другой токен
```

### API-GEN-05-HIGH-7: Парсер не обрабатывает вложенные CVA варианты

**Файл:** `docs-app/lib/autodocs/parser.ts`

**Проблема:** Функция `extractVariants()` не обрабатывает сложные вложенные структуры CVA.

**FIX:** Улучшить парсинг для обработки всех вариантов CVA структур.

### DEAD-LINKS-11-HIGH-8: Битые ссылки в навигации

**Файл:** `docs-app/components/layout/Sidebar.tsx`

**Проблема:** Ссылки на `/components/ui`, `/components/layout`, `/components/overlays`, `/components/menus`, `/components/navigation`, `/components/data` ведут на несуществующие страницы.

**FIX:** Либо создать эти страницы, либо удалить ссылки из навигации.

## Средний приоритет (желательно исправить)

### MDX-03-MED-1: Отсутствие обработки кодовых блоков в MDX

**Проблема:** `mdx-components.tsx` не переопределяет стандартные HTML элементы для кодовых блоков.

**FIX:** Добавить обработку `pre` и `code` элементов:

```typescript
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: CodeBlock,
    code: InlineCode,
    // ...
  };
}
```

### API-GEN-05-MED-2: Генератор не извлекает примеры из JSDoc

**Файл:** `docs-app/lib/autodocs/generator.ts`

**Проблема:** Парсер не извлекает `@example` теги из JSDoc комментариев.

**FIX:** Добавить извлечение примеров из JSDoc.

### BUILD-10-MED-3: Отсутствие проверки типов в скриптах

**Проблема:** Скрипты генерации и валидации не имеют строгой типизации.

**FIX:** Добавить TypeScript типы для всех функций.

### A11Y-07-MED-4: Отсутствие skip links

**Проблема:** Нет возможности пропустить навигацию для screen readers.

**FIX:** Добавить skip link в начало страницы:

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### UI-CONSISTENCY-09-MED-5: Несогласованность использования компонентов

**Проблема:** Некоторые страницы используют разные подходы к отображению контента.

**FIX:** Стандартизировать использование `PageShell` и других компонентов.

### DEAD-LINKS-11-MED-6: Скрипт валидации не проверяет все типы ссылок

**Файл:** `docs-app/scripts/validate-docs.ts`

**Проблема:** Скрипт не проверяет:

- Ссылки в компонентах
- Динамические ссылки
- Ссылки в MDX файлах (если они будут настоящими MDX)

**FIX:** Расширить проверку на все типы ссылок.

## Низкий приоритет (можно отложить)

### MDX-03-LOW-1: Отсутствие remark/rehype плагинов

**Файл:** `docs-app/next.config.mjs`

**Проблема:** MDX конфигурация не использует полезные плагины (remark-gfm, rehype-pretty-code уже в зависимостях, но не подключены).

**FIX:** Подключить плагины:

```javascript
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrettyCode],
  },
});
```

### A11Y-07-LOW-2: Отсутствие focus visible стилей

**Проблема:** Не все интерактивные элементы имеют видимые focus states.

**FIX:** Добавить `focus-visible:` стили для всех интерактивных элементов.

### BUILD-10-LOW-3: Отсутствие bundle size анализа

**Проблема:** Нет автоматической проверки размера бандла.

**FIX:** Добавить `@next/bundle-analyzer` для анализа размера бандла.

## Положительные моменты

1. ✅ **Архитектурная независимость:** UI-библиотека не импортирует код из docs-app
2. ✅ **Корректное использование workspace:** `workspace:*` правильно настроен
3. ✅ **SSR безопасность:** Все клиентские компоненты правильно помечены `"use client"`
4. ✅ **Структура Next.js:** Корректное использование App Router
5. ✅ **Типизация:** TypeScript используется повсеместно
6. ✅ **Компонентная структура:** Хорошая организация компонентов

## Рекомендации перед релизом

### Обязательные исправления (критичные):

1. Заменить все прямые импорты из `src/` на импорты из `@tenerife.music/ui/tokens`
2. Реализовать полноценную систему поиска
3. Реализовать загрузку компонентных страниц
4. Исправить парсер для извлечения default values
5. Исправить пути в скрипте генерации
6. Исправить Sandpack зависимости

### Желательные исправления (высокий приоритет):

1. Переписать MDX файлы как настоящие MDX или переименовать в TSX
2. Добавить метаданные на все страницы
3. Улучшить ARIA поддержку
4. Добавить keyboard navigation для поиска
5. Исправить битые ссылки в навигации

### Оптимизации (средний/низкий приоритет):

1. Подключить remark/rehype плагины
2. Добавить bundle size анализ
3. Улучшить accessibility (skip links, focus states)

## Метрики

- **Всего проверено файлов:** 49
- **Найдено проблем:** 23
- **Критичных:** 6
- **Высокий приоритет:** 8
- **Средний приоритет:** 6
- **Низкий приоритет:** 3

## Заключение

Система документации имеет хорошую архитектурную основу, но содержит несколько критичных проблем, которые блокируют production deployment. После исправления критичных проблем система будет готова к использованию. Рекомендуется исправить все критичные проблемы перед первым релизом.

---

**Следующие шаги:**

1. Исправить все критичные проблемы
2. Протестировать исправления
3. Запустить production build
4. Провести финальную проверку
5. Деплой документации
