# Component Examples

Usage examples for TUI components, demonstrating token-driven styling and Foundation/Extension architecture.

---

## Foundation Components

Foundation components are locked and immutable. They delegate all behavior to Radix UI primitives and use token-driven styling.

### Modal (Foundation)

Modal is the sole modal foundation, built on Radix Dialog. All modal-like components must use Modal internally.

```tsx
import { Modal, Button } from "@tenerife.music/ui";
import { useState } from "react";

function ModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal.Root open={open} onOpenChange={setOpen}>
        <Modal.Trigger asChild>
          <Button>Open</Button>
        </Modal.Trigger>
        <Modal.Content size="md">
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
            <Modal.Description>Modal description</Modal.Description>
          </Modal.Header>
          <div>Modal content goes here</div>
          <Modal.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </Modal.Footer>
          <Modal.Close />
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
```

**Modal API:**
- `Modal.Root` - Root container (Radix Dialog.Root)
- `Modal.Trigger` - Trigger button
- `Modal.Content` - Content container with token-driven `size` prop
- `Modal.Header` - Header section
- `Modal.Title` - Title (Radix Dialog.Title)
- `Modal.Description` - Description (Radix Dialog.Description)
- `Modal.Footer` - Footer section
- `Modal.Close` - Close button (Radix Dialog.Close)

**Props:**
- `size`: Token union (`"sm" | "md" | "lg" | "xl" | "fullscreen"`) - Maps to spacing tokens
- All Radix Dialog props pass through for behavior

### Tabs (Foundation)

Tabs is the sole tabs foundation, built on Radix Tabs.

```tsx
import { Tabs } from "@tenerife.music/ui";

function TabsExample() {
  return (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content for tab 1</Tabs.Content>
      <Tabs.Content value="tab2">Content for tab 2</Tabs.Content>
      <Tabs.Content value="tab3">Content for tab 3</Tabs.Content>
    </Tabs.Root>
  );
}
```

### Select (Foundation)

Select is the sole select foundation, built on Radix Select.

```tsx
import { Select } from "@tenerife.music/ui";

function SelectExample() {
  return (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select an option" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="option1">Option 1</Select.Item>
        <Select.Item value="option2">Option 2</Select.Item>
        <Select.Item value="option3">Option 3</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
```

### ContextMenu (Foundation)

ContextMenu is the sole context menu foundation, built on Radix ContextMenu.

```tsx
import { ContextMenu } from "@tenerife.music/ui";

function ContextMenuExample() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        Right-click here
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>Copy</ContextMenu.Item>
        <ContextMenu.Item>Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
```

### Toast (Foundation)

Toast is the sole toast foundation, built on Radix Toast.

```tsx
import { Toast, ToastProvider, useToast } from "@tenerife.music/ui";
import { Button } from "@tenerife.music/ui";

function ToastExample() {
  const { toast } = useToast();

  return (
    <ToastProvider>
      <Button
        onClick={() => {
          toast({
            title: "Toast Title",
            description: "Toast description",
          });
        }}
      >
        Show Toast
      </Button>
      <Toast.Viewport />
    </ToastProvider>
  );
}
```

---

## Extension Components

Extension components are composable and may use Foundation components internally.

### Button

Button uses token-driven variants through CVA.

```tsx
import { Button } from "@tenerife.music/ui";

function ButtonExamples() {
  return (
    <>
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </>
  );
}
```

**Sizes (token-driven):**

```tsx
import { Button } from "@tenerife.music/ui";

function ButtonSizes() {
  return (
    <>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🔍</Button>
    </>
  );
}
```

**Props:**
- `variant`: Token union (`"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`)
- `size`: Token union (`"sm" | "default" | "lg" | "icon"`)
- `disabled`: `boolean`
- `asChild`: `boolean` - Use as Radix UI Slot

### Input

Input fields with token-driven state variants.

```tsx
import { Input, Label } from "@tenerife.music/ui";

function InputExample() {
  return (
    <>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="example@email.com" />
    </>
  );
}
```

**Input Types:**

```tsx
import { Input, Label } from "@tenerife.music/ui";

function InputTypes() {
  return (
    <>
      <div>
        <Label htmlFor="text">Text</Label>
        <Input id="text" type="text" placeholder="Enter text" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="email@example.com" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Password" />
      </div>
    </>
  );
}
```

**Props:**
- All standard HTML input props
- `type`: `"text" | "email" | "password" | "number" | ...`
- `placeholder`: `string`
- `disabled`: `boolean`

### Card

Card component with token-driven variants.

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@tenerife.music/ui";

function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  );
}
```

**Card Variants (token-driven):**

```tsx
import { Card } from "@tenerife.music/ui";

function CardVariants() {
  return (
    <>
      <Card variant="default">Default</Card>
      <Card variant="elevated">Elevated</Card>
      <Card variant="glass">Glass</Card>
      <Card variant="outline">Outline</Card>
    </>
  );
}
```

### Field

Form field wrapper with validation, using token-driven spacing.

```tsx
import {
  Field,
  FieldLabel,
  FieldControl,
  FieldError,
  Input,
  Button,
} from "@tenerife.music/ui";

function FieldExample() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <FieldControl asChild>
        <Input type="email" placeholder="example@email.com" />
      </FieldControl>
      <FieldError>Email is required</FieldError>
    </Field>
  );
}
```

### Layout Components

Layout components use token-driven spacing and sizing.

#### Flex

```tsx
import { Flex } from "@tenerife.music/ui";

function FlexExample() {
  return (
    <Flex direction="row" gap="md" align="center" justify="between">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Flex>
  );
}
```

**Props:**
- `direction`: `"row" | "column"`
- `gap`: Token union (`"xs" | "sm" | "md" | "lg" | "xl" | ...`) - Maps to spacing tokens
- `align`: `"start" | "center" | "end" | "stretch"`
- `justify`: `"start" | "center" | "end" | "between" | "around"`

#### Grid

```tsx
import { Grid } from "@tenerife.music/ui";

function GridExample() {
  return (
    <Grid cols={3} gap="md">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Grid>
  );
}
```

**Props:**
- `cols`: `number` - Number of columns
- `gap`: Token union - Maps to spacing tokens
- Responsive breakpoint props available

#### Section

```tsx
import { Section } from "@tenerife.music/ui";

function SectionExample() {
  return (
    <Section padding="lg" background="muted">
      <h2>Section Title</h2>
      <p>Section content</p>
    </Section>
  );
}
```

**Props:**
- `padding`: Token union (`"none" | "sm" | "md" | "lg" | "xl"`) - Maps to spacing tokens
- `background`: Token union (`"default" | "muted" | "card"`) - Maps to surface tokens

### Skeleton

Loading state skeleton with token-driven sizing.

```tsx
import { Skeleton } from "@tenerife.music/ui";

function SkeletonExample() {
  return (
    <>
      <Skeleton height="md" width="full" />
      <Skeleton height="sm" width="3/4" />
      <Skeleton height="sm" width="1/2" />
    </>
  );
}
```

---

## Combined Examples

### Form with Validation

```tsx
import {
  Field,
  FieldLabel,
  FieldControl,
  FieldError,
  Input,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@tenerife.music/ui";

function ContactForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldControl asChild>
              <Input type="email" placeholder="your@email.com" />
            </FieldControl>
            <FieldError>Email is required</FieldError>
          </Field>
          <Button type="submit" variant="default">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### Card with Modal

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Button,
  Modal,
} from "@tenerife.music/ui";
import { useState } from "react";

function CardWithModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Event Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Event description</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setOpen(true)}>View Details</Button>
        </CardFooter>
      </Card>

      <Modal.Root open={open} onOpenChange={setOpen}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Event Details</Modal.Title>
          </Modal.Header>
          <div>Detailed event information</div>
          <Modal.Footer>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Modal.Footer>
          <Modal.Close />
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
```

---

## Token-Driven Styling

All components use token-driven styling. Visual properties are controlled through token unions that map to semantic design tokens:

- **Spacing**: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | ...` → Maps to spacing tokens
- **Colors**: Semantic color tokens (`bg-primary`, `text-primary-foreground`)
- **Sizes**: Token unions that map to typography or spacing tokens
- **Variants**: CVA variants that use token unions

No hardcoded values. Everything through tokens.

---

## Next Steps

- [Usage Guide](./USAGE.md) - Complete usage guide
- [Tokens Guide](./TOKENS_GUIDE.md) - Working with tokens
- [Theme Guide](./THEME_GUIDE.md) - Theme setup
- [Architecture Lock](../architecture/FINAL_FOUNDATION_LOCK.md) - Foundation architecture

---

**Document Version:** 2.0  
**Last Updated:** 2025-12-12
