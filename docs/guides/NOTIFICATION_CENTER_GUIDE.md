# 🔔 NotificationCenter Guide

**Last Updated:** 2025-12-11  
**Version:** 1.0

Полное руководство по использованию системы уведомлений NotificationCenter в Tenerife UI.

---

## Введение

NotificationCenter — это система управления уведомлениями с поддержкой множественных каналов, группировки, истории и персистентности. Система полностью token-driven, SSR-safe и соответствует стандартам доступности.

### Основные возможности

- 🔔 **Множественные каналы**: success, error, info, warning, system, log
- 📚 **История уведомлений**: персистентная история с лимитом
- 🗂️ **Группировка**: автоматическая группировка по каналам
- ♿ **Доступность**: полная поддержка клавиатуры и screen readers
- 🎨 **Token-driven**: все стили через design tokens
- ⚡ **SSR-safe**: безопасная работа с Server-Side Rendering

---

## Установка и настройка

### Базовая настройка

NotificationCenter требует Provider для работы:

```tsx
import { NotificationCenterProvider } from "@tenerife.music/ui";

function App() {
  return (
    <NotificationCenterProvider>
      <YourApp />
    </NotificationCenterProvider>
  );
}
```

### Настройка с параметрами

```tsx
import { NotificationCenterProvider } from "@tenerife.music/ui";

function App() {
  return (
    <NotificationCenterProvider
      maxHistory={100} // Максимальное количество уведомлений в истории
      persistent={true} // Включить персистентную историю
    >
      <YourApp />
    </NotificationCenterProvider>
  );
}
```

---

## Использование useNotificationCenter

### Базовое использование

Хук `useNotificationCenter` предоставляет удобные методы для показа уведомлений:

```tsx
import { useNotificationCenter } from "@tenerife.music/ui";

function MyComponent() {
  const notify = useNotificationCenter();

  const handleSuccess = () => {
    notify.success("Операция выполнена успешно!");
  };

  const handleError = () => {
    notify.error("Произошла ошибка!");
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
    </div>
  );
}
```

### Все каналы уведомлений

```tsx
import { useNotificationCenter } from "@tenerife.music/ui";

function NotificationExample() {
  const notify = useNotificationCenter();

  return (
    <div className="space-y-2">
      <button onClick={() => notify.success("Успешно!")}>Success</button>
      <button onClick={() => notify.error("Ошибка!")}>Error</button>
      <button onClick={() => notify.info("Информация")}>Info</button>
      <button onClick={() => notify.warning("Предупреждение")}>Warning</button>
      <button onClick={() => notify.system("Системное уведомление")}>System</button>
      <button onClick={() => notify.log("Лог запись")}>Log</button>
    </div>
  );
}
```

### Расширенные опции

```tsx
import { useNotificationCenter } from "@tenerife.music/ui";

function AdvancedExample() {
  const notify = useNotificationCenter();

  const showCustomNotification = () => {
    notify.push({
      title: "Кастомное уведомление",
      message: "Это уведомление с кастомными опциями",
      variant: "default",
      channel: "info",
      persistent: true, // Не исчезает автоматически
      duration: 0, // 0 = не исчезает
      action: {
        label: "Действие",
        onClick: () => console.log("Action clicked"),
      },
    });
  };

  return <button onClick={showCustomNotification}>Показать кастомное уведомление</button>;
}
```

---

## NotificationCenter Panel

### Базовое использование панели

```tsx
import {
  NotificationCenter,
  NotificationCenterProvider,
  useNotificationCenter,
} from "@tenerife.music/ui";
import { useState } from "react";

function NotificationPanelExample() {
  const notify = useNotificationCenter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <NotificationCenter.Trigger onClick={() => setIsOpen(true)}>
        Открыть уведомления
      </NotificationCenter.Trigger>

      <NotificationCenter.Panel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <NotificationCenterProvider>
      <NotificationPanelExample />
    </NotificationCenterProvider>
  );
}
```

### Полный пример с уведомлениями

```tsx
import {
  NotificationCenter,
  NotificationCenterProvider,
  useNotificationCenter,
  Button,
} from "@tenerife.music/ui";
import { useState } from "react";

function NotificationCenterDemo() {
  const notify = useNotificationCenter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <NotificationCenter.Trigger onClick={() => setIsOpen(true)}>
          Уведомления
        </NotificationCenter.Trigger>
        <Button onClick={() => setIsOpen(true)}>Открыть панель</Button>
      </div>

      <div className="space-y-2">
        <Button onClick={() => notify.success("Операция выполнена успешно!")} variant="outline">
          Success
        </Button>
        <Button onClick={() => notify.error("Что-то пошло не так!")} variant="outline">
          Error
        </Button>
        <Button onClick={() => notify.info("Вот некоторая информация")} variant="outline">
          Info
        </Button>
        <Button onClick={() => notify.warning("Пожалуйста, будьте осторожны")} variant="outline">
          Warning
        </Button>
      </div>

      <NotificationCenter.Panel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <NotificationCenterProvider>
      <NotificationCenterDemo />
    </NotificationCenterProvider>
  );
}
```

---

## Компоненты NotificationCenter

### NotificationCenter.Provider

Глобальный провайдер для управления состоянием уведомлений.

**Props:**

- `children`: `React.ReactNode` - Дочерние компоненты
- `maxHistory`: `number` - Максимальное количество уведомлений в истории (по умолчанию: 100)
- `persistent`: `boolean` - Включить персистентную историю (по умолчанию: true)

### NotificationCenter.Panel

Панель для отображения списка уведомлений.

**Props:**

- `isOpen`: `boolean` - Открыта ли панель
- `onClose`: `() => void` - Функция закрытия
- `groupBy?`: `GroupByFunction` - Функция группировки уведомлений

### NotificationCenter.Trigger

Кнопка для открытия панели уведомлений.

**Props:**

- `onClick`: `() => void` - Обработчик клика
- `children`: `React.ReactNode` - Содержимое кнопки

### NotificationCenter.List

Список уведомлений (используется внутри Panel).

### NotificationCenter.Item

Отдельный элемент уведомления в списке.

### NotificationCenter.GroupHeader

Заголовок группы уведомлений.

### NotificationCenter.DismissAll

Кнопка для удаления всех уведомлений.

---

## API useNotificationCenter

### Методы

| Метод                        | Описание                       | Пример                             |
| ---------------------------- | ------------------------------ | ---------------------------------- |
| `success(message, options?)` | Показать success уведомление   | `notify.success("Успешно!")`       |
| `error(message, options?)`   | Показать error уведомление     | `notify.error("Ошибка!")`          |
| `info(message, options?)`    | Показать info уведомление      | `notify.info("Информация")`        |
| `warning(message, options?)` | Показать warning уведомление   | `notify.warning("Предупреждение")` |
| `system(message, options?)`  | Показать system уведомление    | `notify.system("Системное")`       |
| `log(message, options?)`     | Показать log уведомление       | `notify.log("Лог")`                |
| `push(options)`              | Показать кастомное уведомление | `notify.push({...})`               |
| `remove(id)`                 | Удалить уведомление по ID      | `notify.remove("id")`              |
| `clearAll()`                 | Очистить все уведомления       | `notify.clearAll()`                |
| `clearChannel(channel)`      | Очистить уведомления канала    | `notify.clearChannel("error")`     |

### NotificationOptions

```typescript
interface NotificationOptions {
  title?: string; // Заголовок уведомления
  message: string; // Сообщение (обязательно)
  variant?: NotificationVariant; // Вариант стиля
  channel?: NotificationChannel; // Канал уведомления
  persistent?: boolean; // Не исчезает автоматически
  duration?: number; // Длительность в мс (0 = не исчезает)
  action?: {
    // Действие
    label: string;
    onClick: () => void;
  };
}
```

---

## Примеры использования

### Интеграция с формами

```tsx
import { useNotificationCenter, Button } from "@tenerife.music/ui";
import { useState } from "react";

function ContactForm() {
  const notify = useNotificationCenter();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Отправка формы
      await submitForm({ email });
      notify.success("Форма успешно отправлена!");
      setEmail("");
    } catch (error) {
      notify.error("Ошибка при отправке формы");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button type="submit">Отправить</Button>
    </form>
  );
}
```

### Уведомления с действиями

```tsx
import { useNotificationCenter } from "@tenerife.music/ui";

function NotificationWithAction() {
  const notify = useNotificationCenter();

  const showUndoNotification = () => {
    notify.push({
      message: "Элемент удален",
      variant: "default",
      action: {
        label: "Отменить",
        onClick: () => {
          // Логика отмены
          notify.info("Действие отменено");
        },
      },
    });
  };

  return <button onClick={showUndoNotification}>Удалить элемент</button>;
}
```

### Группировка уведомлений

```tsx
import {
  NotificationCenter,
  NotificationCenterProvider,
  useNotificationCenter,
} from "@tenerife.music/ui";

function GroupingExample() {
  const notify = useNotificationCenter();
  const [isOpen, setIsOpen] = useState(false);

  const addMultipleNotifications = () => {
    notify.success("Платеж обработан успешно");
    notify.error("Не удалось подключиться к серверу");
    notify.info("Новое сообщение от John Doe");
    notify.warning("Ваша подписка истекает через 3 дня");
    notify.system("Запланировано системное обслуживание");
  };

  return (
    <div>
      <button onClick={addMultipleNotifications}>Добавить все каналы</button>
      <NotificationCenter.Panel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
```

---

## Кастомизация

### Группировка уведомлений

```tsx
import { NotificationCenter } from "@tenerife.music/ui";

function CustomGrouping() {
  const groupBy = (notification: NotificationData) => {
    // Группировка по каналу
    return notification.channel;
  };

  return (
    <NotificationCenter.Panel isOpen={isOpen} onClose={() => setIsOpen(false)} groupBy={groupBy} />
  );
}
```

---

## Доступность

NotificationCenter полностью соответствует стандартам WCAG AA:

- ✅ Клавиатурная навигация
- ✅ ARIA атрибуты
- ✅ Screen reader поддержка
- ✅ Focus management
- ✅ Цветовой контраст

---

## Best Practices

### 1. Используйте правильные каналы

```tsx
// ✅ Правильно
notify.success("Операция выполнена");
notify.error("Ошибка подключения");

// ❌ Неправильно
notify.push({ message: "Успех", variant: "default" });
```

### 2. Предоставляйте контекст

```tsx
// ✅ Хорошо - с заголовком
notify.push({
  title: "Файл загружен",
  message: "document.pdf успешно загружен",
});

// ❌ Плохо - только сообщение
notify.info("Готово");
```

### 3. Используйте действия для важных операций

```tsx
// ✅ Хорошо - с возможностью отмены
notify.push({
  message: "Элемент удален",
  action: {
    label: "Отменить",
    onClick: handleUndo,
  },
});
```

### 4. Не злоупотребляйте persistent уведомлениями

```tsx
// ✅ Хорошо - только для важных
notify.push({
  message: "Критическая ошибка",
  persistent: true,
});

// ❌ Плохо - для всех уведомлений
notify.push({
  message: "Информация",
  persistent: true, // Не нужно
});
```

---

## Troubleshooting

### Уведомления не показываются

1. Убедитесь, что `NotificationCenterProvider` обернул ваше приложение
2. Проверьте, что используете `useNotificationCenter` внутри Provider
3. Проверьте консоль на наличие ошибок

### Панель не открывается

1. Проверьте, что `isOpen` состояние правильно управляется
2. Убедитесь, что `onClose` функция передана
3. Проверьте, что Panel находится внутри Provider

---

## Следующие шаги

- [Toast Guide](./TOAST_GUIDE.md) - Использование Toast для временных уведомлений
- [Component Examples](./COMPONENT_EXAMPLES.md) - Примеры использования компонентов
- [Accessibility Guidelines](./a11y_guidelines.md) - Руководство по доступности

---

**Версия документа:** 1.0  
**Последнее обновление:** 2025-12-11
