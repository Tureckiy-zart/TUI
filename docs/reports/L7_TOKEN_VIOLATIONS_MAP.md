# L7 Token Violations Map

**Generated:** 2025-12-10T10:41:38.116Z

**Total Violations:** 2133

---

## Forms Components

**Total:** 155 violations

### src/components/checkbox/Checkbox.stories.tsx

**Violations:** 22

#### tailwind-bg-color (1)

- **Line 260:40** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <h3 className="mb-md text-lg font-semibold">Keyboard Navigation</h3>
          <p className="mb-md text-sm text-muted-foreground">
>           Press <kbd className="rounded [bg-muted] px-1 py-0.5 text-xs">Space</kbd> to toggle the
            checkbox.
          </p>
```

#### tailwind-text-color (9)

- **Line 111:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Checkbox size="xs" aria-label="Extra small checkbox" />
>         <span className="text-xs [text-muted]-foreground">xs</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 115:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Checkbox size="sm" aria-label="Small checkbox" />
>         <span className="text-xs [text-muted]-foreground">sm</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 119:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Checkbox size="md" aria-label="Medium checkbox" />
>         <span className="text-xs [text-muted]-foreground">md</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 123:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Checkbox size="lg" aria-label="Large checkbox" />
>         <span className="text-xs [text-muted]-foreground">lg</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 127:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Checkbox size="xl" aria-label="Extra large checkbox" />
>         <span className="text-xs [text-muted]-foreground">xl</span>
        </div>
      </div>
```

_... and 4 more violations of this type_

#### numeric-spacing (2)

- **Line 260:49** - `px-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <h3 className="mb-md text-lg font-semibold">Keyboard Navigation</h3>
          <p className="mb-md text-sm text-muted-foreground">
>           Press <kbd className="rounded bg-muted [px-1] py-0.5 text-xs">Space</kbd> to toggle the
            checkbox.
          </p>
```

- **Line 260:54** - `py-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <h3 className="mb-md text-lg font-semibold">Keyboard Navigation</h3>
          <p className="mb-md text-sm text-muted-foreground">
>           Press <kbd className="rounded bg-muted px-1 [py-0].5 text-xs">Space</kbd> to toggle the
            checkbox.
          </p>
```

#### typography-size (10)

- **Line 111:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Checkbox size="xs" aria-label="Extra small checkbox" />
>         <span className="[text-xs] text-muted-foreground">xs</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 115:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Checkbox size="sm" aria-label="Small checkbox" />
>         <span className="[text-xs] text-muted-foreground">sm</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 119:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Checkbox size="md" aria-label="Medium checkbox" />
>         <span className="[text-xs] text-muted-foreground">md</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 123:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Checkbox size="lg" aria-label="Large checkbox" />
>         <span className="[text-xs] text-muted-foreground">lg</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 127:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Checkbox size="xl" aria-label="Extra large checkbox" />
>         <span className="[text-xs] text-muted-foreground">xl</span>
        </div>
      </div>
```

_... and 5 more violations of this type_

### src/components/checkbox/Checkbox.tsx

**Violations:** 1

#### numeric-radius (1)

- **Line 138:21** - `rounded-sm`
  - Suggestion: Use radius tokens through component token system

```
                CHECKBOX_TOKENS.indeterminate.height,
                CHECKBOX_TOKENS.indeterminate.color,
>               "block [rounded-sm]",
              )}
              aria-hidden="true"
```

### src/components/input/Input.stories.tsx

**Violations:** 17

#### numeric-size (10)

- **Line 84:25** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const AllSizes: Story = {
    render: () => (
>     <div className="flex [w-64] flex-col gap-md">
        <Input size="xs" placeholder="Extra small input" />
        <Input size="sm" placeholder="Small input" />
```

- **Line 96:25** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const AllVariants: Story = {
    render: () => (
>     <div className="flex [w-64] flex-col gap-md">
        <Input variant="primary" placeholder="Primary variant" />
        <Input variant="secondary" placeholder="Secondary variant" />
```

- **Line 108:25** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const AllStates: Story = {
    render: () => (
>     <div className="flex [w-64] flex-col gap-md">
        <Input state="default" placeholder="Default state" />
        <Input state="error" placeholder="Error state" defaultValue="Invalid value" />
```

- **Line 119:25** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const WithIcons: Story = {
    render: () => (
>     <div className="flex [w-64] flex-col gap-md">
        <Input placeholder="Search..." iconLeft={<Icon name="search" size="sm" />} />
        <Input
```

- **Line 178:20** - `w-full`
  - Suggestion: Use size tokens through component token system

```
  export const FullWidth: Story = {
    render: () => (
>     <div className="[w-full] max-w-md">
        <Input fullWidth placeholder="Full width input" />
      </div>
```

_... and 5 more violations of this type_

#### typography-size (5)

- **Line 201:39** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          aria-describedby="error-message"
        />
>       <p id="error-message" className="[text-sm] text-[hsl(var(--destructive))]">
          This field is required
        </p>
```

- **Line 205:41** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </p>
        <Input placeholder="Input with success" state="success" aria-describedby="success-message" />
>       <p id="success-message" className="[text-sm] text-[hsl(var(--semantic-success))]">
          Value is valid
        </p>
```

- **Line 242:23** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className="flex w-full max-w-2xl flex-col gap-lg">
        <div className="flex flex-col gap-md">
>         <h3 className="[text-lg] font-semibold">All Variants with Icons</h3>
          <Input
            variant="primary"
```

- **Line 271:23** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div className="flex flex-col gap-md">
>         <h3 className="[text-lg] font-semibold">All Sizes</h3>
          <Input size="xs" placeholder="Extra small" />
          <Input size="sm" placeholder="Small" />
```

- **Line 279:23** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div className="flex flex-col gap-md">
>         <h3 className="[text-lg] font-semibold">All States</h3>
          <Input state="default" placeholder="Default state" />
          <Input state="error" placeholder="Error state" defaultValue="Error value" />
```

#### direct-css-var (2)

- **Line 201:53** - `hsl(var(--destructive))`
  - Suggestion: Use token references instead of direct hsl(var(--\*))

```
          aria-describedby="error-message"
        />
>       <p id="error-message" className="text-sm text-[[hsl(var(--destructive))]]">
          This field is required
        </p>
```

- **Line 205:55** - `hsl(var(--semantic-success))`
  - Suggestion: Use token references instead of direct hsl(var(--\*))

```
        </p>
        <Input placeholder="Input with success" state="success" aria-describedby="success-message" />
>       <p id="success-message" className="text-sm text-[[hsl(var(--semantic-success))]]">
          Value is valid
        </p>
```

### src/components/input/Input.tsx

**Violations:** 6

#### numeric-spacing (4)

- **Line 78:26** - `left-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              <span
                className={cn(
>                 "absolute [left-0] top-0 flex h-full items-center",
                  INPUT_TOKENS.icon.paddingLeft,
                  INPUT_TOKENS.icon.size,
```

- **Line 78:33** - `top-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              <span
                className={cn(
>                 "absolute left-0 [top-0] flex h-full items-center",
                  INPUT_TOKENS.icon.paddingLeft,
                  INPUT_TOKENS.icon.size,
```

- **Line 99:26** - `right-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              <span
                className={cn(
>                 "absolute [right-0] top-0 flex h-full items-center",
                  INPUT_TOKENS.icon.paddingRight,
                  INPUT_TOKENS.icon.size,
```

- **Line 99:34** - `top-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              <span
                className={cn(
>                 "absolute right-0 [top-0] flex h-full items-center",
                  INPUT_TOKENS.icon.paddingRight,
                  INPUT_TOKENS.icon.size,
```

#### numeric-size (2)

- **Line 78:44** - `h-full`
  - Suggestion: Use size tokens through component token system

```
              <span
                className={cn(
>                 "absolute left-0 top-0 flex [h-full] items-center",
                  INPUT_TOKENS.icon.paddingLeft,
                  INPUT_TOKENS.icon.size,
```

- **Line 99:45** - `h-full`
  - Suggestion: Use size tokens through component token system

```
              <span
                className={cn(
>                 "absolute right-0 top-0 flex [h-full] items-center",
                  INPUT_TOKENS.icon.paddingRight,
                  INPUT_TOKENS.icon.size,
```

### src/components/radio/Radio.stories.tsx

**Violations:** 50

#### tailwind-bg-color (5)

- **Line 394:38** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <h3 className="mb-md text-lg font-semibold">Keyboard Navigation in RadioGroup</h3>
          <p className="mb-md text-sm text-muted-foreground">
>           Use <kbd className="rounded [bg-muted] px-1 py-0.5 text-xs">ArrowUp</kbd> /{" "}
            <kbd className="rounded bg-muted px-1 py-0.5 text-xs">ArrowDown</kbd> to navigate between
            options in vertical groups.
```

- **Line 395:34** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <p className="mb-md text-sm text-muted-foreground">
            Use <kbd className="rounded bg-muted px-1 py-0.5 text-xs">ArrowUp</kbd> /{" "}
>           <kbd className="rounded [bg-muted] px-1 py-0.5 text-xs">ArrowDown</kbd> to navigate between
            options in vertical groups.
          </p>
```

- **Line 399:38** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          </p>
          <p className="mb-md text-sm text-muted-foreground">
>           Use <kbd className="rounded [bg-muted] px-1 py-0.5 text-xs">ArrowLeft</kbd> /{" "}
            <kbd className="rounded bg-muted px-1 py-0.5 text-xs">ArrowRight</kbd> in horizontal
            groups.
```

- **Line 400:34** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <p className="mb-md text-sm text-muted-foreground">
            Use <kbd className="rounded bg-muted px-1 py-0.5 text-xs">ArrowLeft</kbd> /{" "}
>           <kbd className="rounded [bg-muted] px-1 py-0.5 text-xs">ArrowRight</kbd> in horizontal
            groups.
          </p>
```

- **Line 404:40** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          </p>
          <p className="mb-md text-sm text-muted-foreground">
>           Press <kbd className="rounded [bg-muted] px-1 py-0.5 text-xs">Space</kbd> to select the
            focused radio.
          </p>
```

#### tailwind-text-color (13)

- **Line 100:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Radio size="xs" checked aria-label="Extra small radio" />
>         <span className="text-xs [text-muted]-foreground">xs</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 104:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Radio size="sm" checked aria-label="Small radio" />
>         <span className="text-xs [text-muted]-foreground">sm</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 108:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Radio size="md" checked aria-label="Medium radio" />
>         <span className="text-xs [text-muted]-foreground">md</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 112:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Radio size="lg" checked aria-label="Large radio" />
>         <span className="text-xs [text-muted]-foreground">lg</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 116:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Radio size="xl" checked aria-label="Extra large radio" />
>         <span className="text-xs [text-muted]-foreground">xl</span>
        </div>
      </div>
```

_... and 8 more violations of this type_

#### numeric-spacing (10)

- **Line 394:47** - `px-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <h3 className="mb-md text-lg font-semibold">Keyboard Navigation in RadioGroup</h3>
          <p className="mb-md text-sm text-muted-foreground">
>           Use <kbd className="rounded bg-muted [px-1] py-0.5 text-xs">ArrowUp</kbd> /{" "}
            <kbd className="rounded bg-muted px-1 py-0.5 text-xs">ArrowDown</kbd> to navigate between
            options in vertical groups.
```

- **Line 394:52** - `py-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <h3 className="mb-md text-lg font-semibold">Keyboard Navigation in RadioGroup</h3>
          <p className="mb-md text-sm text-muted-foreground">
>           Use <kbd className="rounded bg-muted px-1 [py-0].5 text-xs">ArrowUp</kbd> /{" "}
            <kbd className="rounded bg-muted px-1 py-0.5 text-xs">ArrowDown</kbd> to navigate between
            options in vertical groups.
```

- **Line 395:43** - `px-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <p className="mb-md text-sm text-muted-foreground">
            Use <kbd className="rounded bg-muted px-1 py-0.5 text-xs">ArrowUp</kbd> /{" "}
>           <kbd className="rounded bg-muted [px-1] py-0.5 text-xs">ArrowDown</kbd> to navigate between
            options in vertical groups.
          </p>
```

- **Line 395:48** - `py-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <p className="mb-md text-sm text-muted-foreground">
            Use <kbd className="rounded bg-muted px-1 py-0.5 text-xs">ArrowUp</kbd> /{" "}
>           <kbd className="rounded bg-muted px-1 [py-0].5 text-xs">ArrowDown</kbd> to navigate between
            options in vertical groups.
          </p>
```

- **Line 399:47** - `px-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          </p>
          <p className="mb-md text-sm text-muted-foreground">
>           Use <kbd className="rounded bg-muted [px-1] py-0.5 text-xs">ArrowLeft</kbd> /{" "}
            <kbd className="rounded bg-muted px-1 py-0.5 text-xs">ArrowRight</kbd> in horizontal
            groups.
```

_... and 5 more violations of this type_

#### typography-size (22)

- **Line 100:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Radio size="xs" checked aria-label="Extra small radio" />
>         <span className="[text-xs] text-muted-foreground">xs</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 104:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Radio size="sm" checked aria-label="Small radio" />
>         <span className="[text-xs] text-muted-foreground">sm</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 108:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Radio size="md" checked aria-label="Medium radio" />
>         <span className="[text-xs] text-muted-foreground">md</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 112:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Radio size="lg" checked aria-label="Large radio" />
>         <span className="[text-xs] text-muted-foreground">lg</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 116:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Radio size="xl" checked aria-label="Extra large radio" />
>         <span className="[text-xs] text-muted-foreground">xl</span>
        </div>
      </div>
```

_... and 17 more violations of this type_

### src/components/select/Select.stories.tsx

**Violations:** 5

#### tailwind-text-color (1)

- **Line 312:30** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            </Select.Listbox>
          </Select.Root>
>         <p className="text-sm [text-muted]-foreground">Selected: {value ?? "none"}</p>
        </div>
      );
```

#### numeric-size (3)

- **Line 122:25** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const AllVariants: Story = {
    render: () => (
>     <div className="flex [w-64] flex-col gap-md">
        <Select.Root>
          <Select.Trigger variant="primary" placeholder="Primary variant" />
```

- **Line 205:25** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const AllSizes: Story = {
    render: () => (
>     <div className="flex [w-64] flex-col gap-md">
        <Select.Root size="xs">
          <Select.Trigger placeholder="Extra small" />
```

- **Line 303:27** - `w-64`
  - Suggestion: Use size tokens through component token system

```

      return (
>       <div className="flex [w-64] flex-col gap-md">
          <Select.Root value={value} onValueChange={setValue}>
            <Select.Trigger placeholder="Controlled select" />
```

#### typography-size (1)

- **Line 312:22** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            </Select.Listbox>
          </Select.Root>
>         <p className="[text-sm] text-muted-foreground">Selected: {value ?? "none"}</p>
        </div>
      );
```

### src/components/select/Select.tsx

**Violations:** 4

#### numeric-spacing (1)

- **Line 352:15** - `ml-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            <ChevronDown
              className={cn(
>               "[ml-2] h-4 w-4 shrink-0 opacity-50 transition-transform",
                context.open && "rotate-180",
              )}
```

#### numeric-size (2)

- **Line 352:20** - `h-4`
  - Suggestion: Use size tokens through component token system

```
            <ChevronDown
              className={cn(
>               "ml-2 [h-4] w-4 shrink-0 opacity-50 transition-transform",
                context.open && "rotate-180",
              )}
```

- **Line 352:24** - `w-4`
  - Suggestion: Use size tokens through component token system

```
            <ChevronDown
              className={cn(
>               "ml-2 h-4 [w-4] shrink-0 opacity-50 transition-transform",
                context.open && "rotate-180",
              )}
```

#### transition-utility (1)

- **Line 352:48** - `transition-transform`
  - Suggestion: Use MOTION_TOKENS for transitions

```
            <ChevronDown
              className={cn(
>               "ml-2 h-4 w-4 shrink-0 opacity-50 [transition-transform]",
                context.open && "rotate-180",
              )}
```

### src/components/switch/Switch.stories.tsx

**Violations:** 32

#### tailwind-bg-color (1)

- **Line 301:40** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <h3 className="mb-md text-lg font-semibold">Keyboard Navigation</h3>
          <p className="mb-md text-sm text-muted-foreground">
>           Press <kbd className="rounded [bg-muted] px-1 py-0.5 text-xs">Space</kbd> to toggle the
            switch.
          </p>
```

#### tailwind-text-color (14)

- **Line 100:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Switch size="xs" aria-label="Extra small switch" />
>         <span className="text-xs [text-muted]-foreground">xs</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 104:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Switch size="sm" aria-label="Small switch" />
>         <span className="text-xs [text-muted]-foreground">sm</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 108:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Switch size="md" aria-label="Medium switch" />
>         <span className="text-xs [text-muted]-foreground">md</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 112:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Switch size="lg" aria-label="Large switch" />
>         <span className="text-xs [text-muted]-foreground">lg</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 116:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-sm">
          <Switch size="xl" aria-label="Extra large switch" />
>         <span className="text-xs [text-muted]-foreground">xl</span>
        </div>
      </div>
```

_... and 9 more violations of this type_

#### numeric-spacing (2)

- **Line 301:49** - `px-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <h3 className="mb-md text-lg font-semibold">Keyboard Navigation</h3>
          <p className="mb-md text-sm text-muted-foreground">
>           Press <kbd className="rounded bg-muted [px-1] py-0.5 text-xs">Space</kbd> to toggle the
            switch.
          </p>
```

- **Line 301:54** - `py-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <h3 className="mb-md text-lg font-semibold">Keyboard Navigation</h3>
          <p className="mb-md text-sm text-muted-foreground">
>           Press <kbd className="rounded bg-muted px-1 [py-0].5 text-xs">Space</kbd> to toggle the
            switch.
          </p>
```

#### typography-size (15)

- **Line 100:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Switch size="xs" aria-label="Extra small switch" />
>         <span className="[text-xs] text-muted-foreground">xs</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 104:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Switch size="sm" aria-label="Small switch" />
>         <span className="[text-xs] text-muted-foreground">sm</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 108:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Switch size="md" aria-label="Medium switch" />
>         <span className="[text-xs] text-muted-foreground">md</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 112:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Switch size="lg" aria-label="Large switch" />
>         <span className="[text-xs] text-muted-foreground">lg</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
```

- **Line 116:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-sm">
          <Switch size="xl" aria-label="Extra large switch" />
>         <span className="[text-xs] text-muted-foreground">xl</span>
        </div>
      </div>
```

_... and 10 more violations of this type_

### src/components/textarea/Textarea.stories.tsx

**Violations:** 18

#### numeric-spacing (2)

- **Line 207:41** - `mt-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            rows={3}
          />
>         <p id="error-message" className="[mt-1] text-sm text-[hsl(var(--destructive))]">
            This field is required
          </p>
```

- **Line 218:43** - `mt-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            rows={3}
          />
>         <p id="success-message" className="[mt-1] text-sm text-[hsl(var(--semantic-success))]">
            Value is valid
          </p>
```

#### numeric-size (8)

- **Line 91:25** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const AllSizes: Story = {
    render: () => (
>     <div className="flex [w-64] flex-col gap-md">
        <Textarea size="xs" placeholder="Extra small textarea" rows={3} />
        <Textarea size="sm" placeholder="Small textarea" rows={3} />
```

- **Line 103:25** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const AllVariants: Story = {
    render: () => (
>     <div className="flex [w-64] flex-col gap-md">
        <Textarea variant="primary" placeholder="Primary variant" rows={3} />
        <Textarea variant="secondary" placeholder="Secondary variant" rows={3} />
```

- **Line 115:25** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const AllStates: Story = {
    render: () => (
>     <div className="flex [w-64] flex-col gap-md">
        <Textarea state="default" placeholder="Default state" rows={3} />
        <Textarea state="error" placeholder="Error state" defaultValue="Invalid value" rows={3} />
```

- **Line 177:25** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const CharacterCountWithMaxLength: Story = {
    render: () => (
>     <div className="flex [w-64] flex-col gap-md">
        <Textarea
          placeholder="Type here..."
```

- **Line 198:25** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const Accessibility: Story = {
    render: () => (
>     <div className="flex [w-64] flex-col gap-md">
        <div>
          <Textarea
```

_... and 3 more violations of this type_

#### typography-size (6)

- **Line 207:46** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            rows={3}
          />
>         <p id="error-message" className="mt-1 [text-sm] text-[hsl(var(--destructive))]">
            This field is required
          </p>
```

- **Line 218:48** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            rows={3}
          />
>         <p id="success-message" className="mt-1 [text-sm] text-[hsl(var(--semantic-success))]">
            Value is valid
          </p>
```

- **Line 256:23** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className="flex w-full max-w-2xl flex-col gap-lg">
        <div className="flex flex-col gap-md">
>         <h3 className="[text-lg] font-semibold">All Variants</h3>
          <Textarea variant="primary" placeholder="Primary variant" rows={3} />
          <Textarea variant="secondary" placeholder="Secondary variant" rows={3} />
```

- **Line 264:23** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div className="flex flex-col gap-md">
>         <h3 className="[text-lg] font-semibold">All Sizes</h3>
          <Textarea size="xs" placeholder="Extra small" rows={2} />
          <Textarea size="sm" placeholder="Small" rows={3} />
```

- **Line 272:23** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div className="flex flex-col gap-md">
>         <h3 className="[text-lg] font-semibold">All States</h3>
          <Textarea state="default" placeholder="Default state" rows={3} />
          <Textarea state="error" placeholder="Error state" defaultValue="Error value" rows={3} />
```

_... and 1 more violations of this type_

#### direct-css-var (2)

- **Line 207:60** - `hsl(var(--destructive))`
  - Suggestion: Use token references instead of direct hsl(var(--\*))

```
            rows={3}
          />
>         <p id="error-message" className="mt-1 text-sm text-[[hsl(var(--destructive))]]">
            This field is required
          </p>
```

- **Line 218:62** - `hsl(var(--semantic-success))`
  - Suggestion: Use token references instead of direct hsl(var(--\*))

```
            rows={3}
          />
>         <p id="success-message" className="mt-1 text-sm text-[[hsl(var(--semantic-success))]]">
            Value is valid
          </p>
```

## Overlays Components

**Total:** 239 violations

### src/components/drawer/drawer-variants.ts

**Violations:** 10

#### tailwind-bg-color (1)

- **Line 21:28** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
   */
  export const drawerVariants = cva(
>   "fixed z-50 flex flex-col [bg-background] border border-border transform",
    {
      variants: {
```

#### numeric-spacing (7)

- **Line 25:15** - `left-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      variants: {
        position: {
>         left: "[left-0] top-0 h-full",
          right: "right-0 top-0 h-full",
          bottom: "bottom-0 left-0 right-0",
```

- **Line 25:22** - `top-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      variants: {
        position: {
>         left: "left-0 [top-0] h-full",
          right: "right-0 top-0 h-full",
          bottom: "bottom-0 left-0 right-0",
```

- **Line 26:16** - `right-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        position: {
          left: "left-0 top-0 h-full",
>         right: "[right-0] top-0 h-full",
          bottom: "bottom-0 left-0 right-0",
        },
```

- **Line 26:24** - `top-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        position: {
          left: "left-0 top-0 h-full",
>         right: "right-0 [top-0] h-full",
          bottom: "bottom-0 left-0 right-0",
        },
```

- **Line 27:17** - `bottom-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          left: "left-0 top-0 h-full",
          right: "right-0 top-0 h-full",
>         bottom: "[bottom-0] left-0 right-0",
        },
        size: {
```

_... and 2 more violations of this type_

#### numeric-size (2)

- **Line 25:28** - `h-full`
  - Suggestion: Use size tokens through component token system

```
      variants: {
        position: {
>         left: "left-0 top-0 [h-full]",
          right: "right-0 top-0 h-full",
          bottom: "bottom-0 left-0 right-0",
```

- **Line 26:30** - `h-full`
  - Suggestion: Use size tokens through component token system

```
        position: {
          left: "left-0 top-0 h-full",
>         right: "right-0 top-0 [h-full]",
          bottom: "bottom-0 left-0 right-0",
        },
```

### src/components/menus/dropdown/DropdownMenuCheckItem.tsx

**Violations:** 2

#### numeric-spacing (2)

- **Line 31:68** - `pl-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
    ({ className, checked = false, children, ...props }, ref) => {
      return (
>       <DropdownMenuItem ref={ref} selected={checked} className={cn("[pl-8]", className)} {...props}>
          <span
            className={cn(
```

- **Line 34:22** - `left-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <span
            className={cn(
>             "absolute [left-2] flex items-center justify-center",
              MENU_TOKENS.indicator.size.sm,
            )}
```

### src/components/menus/dropdown/DropdownMenuItem.tsx

**Violations:** 5

#### tailwind-bg-color (2)

- **Line 132:30** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            MENU_TOKENS.item.radius.md,
            inset && "pl-8",
>           !disabled && "focus:[bg-accent] focus:text-accent-foreground",
            selected && "bg-accent/50",
            disabled && "pointer-events-none opacity-50",
```

- **Line 133:23** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            inset && "pl-8",
            !disabled && "focus:bg-accent focus:text-accent-foreground",
>           selected && "[bg-accent]/50",
            disabled && "pointer-events-none opacity-50",
            className,
```

#### tailwind-text-color (1)

- **Line 132:46** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            MENU_TOKENS.item.radius.md,
            inset && "pl-8",
>           !disabled && "focus:bg-accent focus:[text-accent]-foreground",
            selected && "bg-accent/50",
            disabled && "pointer-events-none opacity-50",
```

#### numeric-spacing (1)

- **Line 131:20** - `pl-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            MENU_TOKENS.item.padding.md,
            MENU_TOKENS.item.radius.md,
>           inset && "[pl-8]",
            !disabled && "focus:bg-accent focus:text-accent-foreground",
            selected && "bg-accent/50",
```

#### transition-utility (1)

- **Line 128:78** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
          aria-selected={selected}
          className={cn(
>           "relative flex cursor-default select-none items-center outline-none [transition-colors]",
            MENU_TOKENS.item.padding.md,
            MENU_TOKENS.item.radius.md,
```

### src/components/menus/dropdown/DropdownMenuLabel.tsx

**Violations:** 1

#### numeric-spacing (1)

- **Line 33:20** - `pl-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            MENU_TOKENS.label.padding.md,
            MENU_TOKENS.label.textStyle,
>           inset && "[pl-8]",
            className,
          )}
```

### src/components/menus/dropdown/DropdownMenuRadioItem.tsx

**Violations:** 4

#### numeric-spacing (2)

- **Line 46:23** - `pl-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          ref={ref}
          selected={checked}
>         className={cn("[pl-8]", className)}
          onSelect={handleSelect}
          {...props}
```

- **Line 52:22** - `left-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <span
            className={cn(
>             "absolute [left-2] flex items-center justify-center",
              MENU_TOKENS.indicator.size.sm,
            )}
```

#### numeric-size (2)

- **Line 56:41** - `h-2`
  - Suggestion: Use size tokens through component token system

```
            )}
          >
>           {checked && <Circle className="[h-2] w-2 fill-current" />}
          </span>
          {children}
```

- **Line 56:45** - `w-2`
  - Suggestion: Use size tokens through component token system

```
            )}
          >
>           {checked && <Circle className="h-2 [w-2] fill-current" />}
          </span>
          {children}
```

### src/components/menus/dropdown/DropdownMenuSubTrigger.tsx

**Violations:** 2

#### numeric-size (2)

- **Line 26:41** - `h-4`
  - Suggestion: Use size tokens through component token system

```
        <DropdownMenuItem ref={ref} className={cn(className)} {...props}>
          {children}
>         <ChevronRight className="ml-auto [h-4] w-4" />
        </DropdownMenuItem>
      );
```

- **Line 26:45** - `w-4`
  - Suggestion: Use size tokens through component token system

```
        <DropdownMenuItem ref={ref} className={cn(className)} {...props}>
          {children}
>         <ChevronRight className="ml-auto h-4 [w-4]" />
        </DropdownMenuItem>
      );
```

### src/components/menus/popover/PopoverArrow.tsx

**Violations:** 1

#### tailwind-bg-color (1)

- **Line 31:58** - `bg-popover`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          ref={ref}
          className={cn(
>           "absolute z-[-1] rotate-45 border border-border [bg-popover]",
            POPOVER_TOKENS.arrow.size[size],
            className,
```

### src/components/menus/popover/PopoverContent.tsx

**Violations:** 2

#### tailwind-bg-color (1)

- **Line 21:42** - `bg-popover`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```

  export const popoverContentVariants = cva(
>   "z-50 outline-none border border-border [bg-popover] text-popover-foreground",
    {
      variants: {
```

#### tailwind-text-color (1)

- **Line 21:53** - `text-popover`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```

  export const popoverContentVariants = cva(
>   "z-50 outline-none border border-border bg-popover [text-popover]-foreground",
    {
      variants: {
```

### src/components/overlays/Backdrop.stories.tsx

**Violations:** 11

#### tailwind-bg-color (2)

- **Line 128:56** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          </div>
          <Backdrop variant={variant} isVisible={true} className="fixed inset-0 z-50" />
>         <div className="relative z-50 rounded-lg border [bg-background] p-lg shadow-lg">
            <p className="text-sm text-muted-foreground">
              Current variant: <strong>{variant}</strong>
```

- **Line 153:117** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                className="fixed inset-0 z-40"
              />
>             <div className="fixed left-1/2 top-1/2 z-50 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border [bg-background] p-lg shadow-lg">
                <h2 className="mb-md text-lg font-semibold">Modal Content</h2>
                <p className="mb-md text-sm text-muted-foreground">
```

#### tailwind-text-color (2)

- **Line 129:32** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <Backdrop variant={variant} isVisible={true} className="fixed inset-0 z-50" />
          <div className="relative z-50 rounded-lg border bg-background p-lg shadow-lg">
>           <p className="text-sm [text-muted]-foreground">
              Current variant: <strong>{variant}</strong>
            </p>
```

- **Line 155:42** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <div className="fixed left-1/2 top-1/2 z-50 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-lg shadow-lg">
                <h2 className="mb-md text-lg font-semibold">Modal Content</h2>
>               <p className="mb-md text-sm [text-muted]-foreground">
                  This modal has a blurred backdrop behind it.
                </p>
```

#### numeric-spacing (2)

- **Line 153:34** - `left-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
                className="fixed inset-0 z-40"
              />
>             <div className="fixed [left-1]/2 top-1/2 z-50 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-lg shadow-lg">
                <h2 className="mb-md text-lg font-semibold">Modal Content</h2>
                <p className="mb-md text-sm text-muted-foreground">
```

- **Line 153:43** - `top-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
                className="fixed inset-0 z-40"
              />
>             <div className="fixed left-1/2 [top-1]/2 z-50 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-lg shadow-lg">
                <h2 className="mb-md text-lg font-semibold">Modal Content</h2>
                <p className="mb-md text-sm text-muted-foreground">
```

#### numeric-radius (2)

- **Line 128:38** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
          </div>
          <Backdrop variant={variant} isVisible={true} className="fixed inset-0 z-50" />
>         <div className="relative z-50 [rounded-lg] border bg-background p-lg shadow-lg">
            <p className="text-sm text-muted-foreground">
              Current variant: <strong>{variant}</strong>
```

- **Line 153:99** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
                className="fixed inset-0 z-40"
              />
>             <div className="fixed left-1/2 top-1/2 z-50 max-w-md -translate-x-1/2 -translate-y-1/2 [rounded-lg] border bg-background p-lg shadow-lg">
                <h2 className="mb-md text-lg font-semibold">Modal Content</h2>
                <p className="mb-md text-sm text-muted-foreground">
```

#### typography-size (3)

- **Line 129:24** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <Backdrop variant={variant} isVisible={true} className="fixed inset-0 z-50" />
          <div className="relative z-50 rounded-lg border bg-background p-lg shadow-lg">
>           <p className="[text-sm] text-muted-foreground">
              Current variant: <strong>{variant}</strong>
            </p>
```

- **Line 154:35** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              />
              <div className="fixed left-1/2 top-1/2 z-50 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-lg shadow-lg">
>               <h2 className="mb-md [text-lg] font-semibold">Modal Content</h2>
                <p className="mb-md text-sm text-muted-foreground">
                  This modal has a blurred backdrop behind it.
```

- **Line 155:34** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              <div className="fixed left-1/2 top-1/2 z-50 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-lg shadow-lg">
                <h2 className="mb-md text-lg font-semibold">Modal Content</h2>
>               <p className="mb-md [text-sm] text-muted-foreground">
                  This modal has a blurred backdrop behind it.
                </p>
```

### src/components/overlays/Backdrop.tsx

**Violations:** 1

#### transition-utility (1)

- **Line 17:49** - `transition-opacity`
  - Suggestion: Use MOTION_TOKENS for transitions

```
  import { OVERLAY_TOKENS } from "@/tokens/components/overlay";

> const backdropVariants = cva("fixed inset-0 z-40 [transition-opacity]", {
    variants: {
      variant: {
```

### src/components/overlays/Dialog.stories.tsx

**Violations:** 11

#### tailwind-bg-color (2)

- **Line 112:68** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                    type="text"
                    placeholder="Enter name"
>                   className="w-full rounded-md border border-border [bg-background] px-md py-sm"
                  />
                </div>
```

- **Line 120:68** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                    placeholder="Enter description"
                    rows={4}
>                   className="w-full rounded-md border border-border [bg-background] px-md py-sm"
                  />
                </div>
```

#### tailwind-text-color (1)

- **Line 75:34** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            </DialogHeader>
            <DialogBody>
>             <p className="text-sm [text-muted]-foreground">
                This will permanently delete the item from your account.
              </p>
```

#### numeric-radius (2)

- **Line 112:36** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
                    type="text"
                    placeholder="Enter name"
>                   className="w-full [rounded-md] border border-border bg-background px-md py-sm"
                  />
                </div>
```

- **Line 120:36** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
                    placeholder="Enter description"
                    rows={4}
>                   className="w-full [rounded-md] border border-border bg-background px-md py-sm"
                  />
                </div>
```

#### numeric-size (2)

- **Line 112:29** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                    type="text"
                    placeholder="Enter name"
>                   className="[w-full] rounded-md border border-border bg-background px-md py-sm"
                  />
                </div>
```

- **Line 120:29** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                    placeholder="Enter description"
                    rows={4}
>                   className="[w-full] rounded-md border border-border bg-background px-md py-sm"
                  />
                </div>
```

#### typography-size (4)

- **Line 75:26** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            </DialogHeader>
            <DialogBody>
>             <p className="[text-sm] text-muted-foreground">
                This will permanently delete the item from your account.
              </p>
```

- **Line 108:46** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              <div className="space-y-md">
                <div>
>                 <label className="mb-xs block [text-sm] font-medium">Name</label>
                  <input
                    type="text"
```

- **Line 116:46** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                </div>
                <div>
>                 <label className="mb-xs block [text-sm] font-medium">Description</label>
                  <textarea
                    placeholder="Enter description"
```

- **Line 152:69** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            </DialogHeader>
            <DialogBody>
>             <div className="max-h-[400px] space-y-md overflow-y-auto [text-sm]">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
```

### src/components/overlays/Modal.stories.tsx

**Violations:** 15

#### tailwind-bg-color (1)

- **Line 120:41** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                <p>This modal has more space for content.</p>
                <p>You can put forms, tables, or other complex content here.</p>
>               <div className="rounded-md [bg-muted] p-md">
                  <h4 className="mb-sm font-semibold">Example Content</h4>
                  <p className="text-sm text-muted-foreground">
```

#### tailwind-text-color (3)

- **Line 60:34** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <ModalHeader>
              <h2 className="text-lg font-semibold">Modal Title</h2>
>             <p className="text-sm [text-muted]-foreground">
                This is a description of what the modal does.
              </p>
```

- **Line 112:34** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <ModalHeader>
              <h2 className="text-lg font-semibold">Large Modal</h2>
>             <p className="text-sm [text-muted]-foreground">
                This is a larger modal with more space for content.
              </p>
```

- **Line 122:38** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                <div className="rounded-md bg-muted p-md">
                  <h4 className="mb-sm font-semibold">Example Content</h4>
>                 <p className="text-sm [text-muted]-foreground">
                    This is an example of how you might structure content in a larger modal.
                  </p>
```

#### numeric-radius (1)

- **Line 120:30** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
                <p>This modal has more space for content.</p>
                <p>You can put forms, tables, or other complex content here.</p>
>               <div className="[rounded-md] bg-muted p-md">
                  <h4 className="mb-sm font-semibold">Example Content</h4>
                  <p className="text-sm text-muted-foreground">
```

#### typography-size (10)

- **Line 59:27** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalHeader>
>             <h2 className="[text-lg] font-semibold">Modal Title</h2>
              <p className="text-sm text-muted-foreground">
                This is a description of what the modal does.
```

- **Line 60:26** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <ModalHeader>
              <h2 className="text-lg font-semibold">Modal Title</h2>
>             <p className="[text-sm] text-muted-foreground">
                This is a description of what the modal does.
              </p>
```

- **Line 88:27** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <Modal open={open} onClose={() => setOpen(false)} size="sm">
            <ModalHeader>
>             <h2 className="[text-lg] font-semibold">Small Modal</h2>
            </ModalHeader>
            <ModalBody>
```

- **Line 111:27** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <Modal open={open} onClose={() => setOpen(false)} size="lg">
            <ModalHeader>
>             <h2 className="[text-lg] font-semibold">Large Modal</h2>
              <p className="text-sm text-muted-foreground">
                This is a larger modal with more space for content.
```

- **Line 112:26** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <ModalHeader>
              <h2 className="text-lg font-semibold">Large Modal</h2>
>             <p className="[text-sm] text-muted-foreground">
                This is a larger modal with more space for content.
              </p>
```

_... and 5 more violations of this type_

### src/components/overlays/OverlayPortal.tsx

**Violations:** 16

#### tailwind-bg-color (1)

- **Line 49:38** - `bg-black`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
    return (
      <div
>       className={cn("absolute inset-0 [bg-black]/50 backdrop-blur-sm", className)}
        style={style}
        onClick={onClick}
```

#### numeric-spacing (12)

- **Line 80:30** - `pt-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
    const positionClasses = {
      center: "flex items-center justify-center",
>     top: "flex justify-center [pt-8]",
      bottom: "flex justify-center pb-8",
      left: "flex items-center pl-8",
```

- **Line 81:33** - `pb-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      center: "flex items-center justify-center",
      top: "flex justify-center pt-8",
>     bottom: "flex justify-center [pb-8]",
      left: "flex items-center pl-8",
      right: "flex items-center pr-8",
```

- **Line 82:29** - `pl-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      top: "flex justify-center pt-8",
      bottom: "flex justify-center pb-8",
>     left: "flex items-center [pl-8]",
      right: "flex items-center pr-8",
      "top-left": "flex justify-start items-start pt-8 pl-8",
```

- **Line 83:30** - `pr-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      bottom: "flex justify-center pb-8",
      left: "flex items-center pl-8",
>     right: "flex items-center [pr-8]",
      "top-left": "flex justify-start items-start pt-8 pl-8",
      "top-right": "flex justify-end items-start pt-8 pr-8",
```

- **Line 84:48** - `pt-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      left: "flex items-center pl-8",
      right: "flex items-center pr-8",
>     "top-left": "flex justify-start items-start [pt-8] pl-8",
      "top-right": "flex justify-end items-start pt-8 pr-8",
      "bottom-left": "flex justify-start items-end pb-8 pl-8",
```

_... and 7 more violations of this type_

#### numeric-size (3)

- **Line 92:30** - `h-full`
  - Suggestion: Use size tokens through component token system

```
    return (
      <div
>       className={cn("relative [h-full] min-h-screen w-full", positionClasses[position], className)}
        style={style}
      >
```

- **Line 92:37** - `min-h-screen`
  - Suggestion: Use size tokens through component token system

```
    return (
      <div
>       className={cn("relative h-full [min-h-screen] w-full", positionClasses[position], className)}
        style={style}
      >
```

- **Line 92:50** - `w-full`
  - Suggestion: Use size tokens through component token system

```
    return (
      <div
>       className={cn("relative h-full min-h-screen [w-full]", positionClasses[position], className)}
        style={style}
      >
```

### src/components/overlays/Popover.stories.tsx

**Violations:** 71

#### tailwind-bg-color (3)

- **Line 269:63** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            </div>
            <div className="space-y-sm">
>             <div className="flex items-start gap-sm rounded-md [bg-muted]/50 p-sm">
                <Bell className="mt-0.5 h-4 w-4 text-primary" />
                <div className="space-y-xs">
```

- **Line 278:63** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                </div>
              </div>
>             <div className="flex items-start gap-sm rounded-md [bg-muted]/50 p-sm">
                <Bell className="mt-0.5 h-4 w-4 text-accent" />
                <div className="space-y-xs">
```

- **Line 287:63** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                </div>
              </div>
>             <div className="flex items-start gap-sm rounded-md [bg-muted]/50 p-sm">
                <Bell className="mt-0.5 h-4 w-4 text-secondary" />
                <div className="space-y-xs">
```

#### tailwind-text-color (20)

- **Line 26:30** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="space-y-sm">
          <h4 className="font-medium leading-none">Settings</h4>
>         <p className="text-sm [text-muted]-foreground">Configure your application settings here.</p>
        </div>
      ),
```

- **Line 40:34** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <div className="space-y-sm">
              <h4 className="font-medium leading-none">User Profile</h4>
>             <p className="text-sm [text-muted]-foreground">Update your profile information.</p>
            </div>
            <div className="space-y-sm">
```

- **Line 75:34** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <div className="space-y-sm">
              <h4 className="font-medium">Primary Popover</h4>
>             <p className="text-sm [text-muted]-foreground">This is a primary popover.</p>
            </div>
          }
```

- **Line 87:34** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <div className="space-y-sm">
              <h4 className="font-medium">Accent Popover</h4>
>             <p className="text-sm [text-muted]-foreground">This is an accent popover.</p>
            </div>
          }
```

- **Line 99:34** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <div className="space-y-sm">
              <h4 className="font-medium">Secondary Popover</h4>
>             <p className="text-sm [text-muted]-foreground">This is a secondary popover.</p>
            </div>
          }
```

_... and 15 more violations of this type_

#### numeric-spacing (5)

- **Line 270:31** - `mt-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            <div className="space-y-sm">
              <div className="flex items-start gap-sm rounded-md bg-muted/50 p-sm">
>               <Bell className="[mt-0].5 h-4 w-4 text-primary" />
                <div className="space-y-xs">
                  <p className="text-sm font-medium">New message</p>
```

- **Line 279:31** - `mt-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              </div>
              <div className="flex items-start gap-sm rounded-md bg-muted/50 p-sm">
>               <Bell className="[mt-0].5 h-4 w-4 text-accent" />
                <div className="space-y-xs">
                  <p className="text-sm font-medium">Task completed</p>
```

- **Line 288:31** - `mt-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              </div>
              <div className="flex items-start gap-sm rounded-md bg-muted/50 p-sm">
>               <Bell className="[mt-0].5 h-4 w-4 text-secondary" />
                <div className="space-y-xs">
                  <p className="text-sm font-medium">Reminder</p>
```

- **Line 302:36** - `right-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
>         <Badge className="absolute -[right-1] -top-1 h-5 w-5 text-xs">3</Badge>
        </Button>
      </PopoverWrapper>
```

- **Line 302:45** - `top-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
>         <Badge className="absolute -right-1 -[top-1] h-5 w-5 text-xs">3</Badge>
        </Button>
      </PopoverWrapper>
```

#### numeric-radius (3)

- **Line 269:52** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
            </div>
            <div className="space-y-sm">
>             <div className="flex items-start gap-sm [rounded-md] bg-muted/50 p-sm">
                <Bell className="mt-0.5 h-4 w-4 text-primary" />
                <div className="space-y-xs">
```

- **Line 278:52** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
                </div>
              </div>
>             <div className="flex items-start gap-sm [rounded-md] bg-muted/50 p-sm">
                <Bell className="mt-0.5 h-4 w-4 text-accent" />
                <div className="space-y-xs">
```

- **Line 287:52** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
                </div>
              </div>
>             <div className="flex items-start gap-sm [rounded-md] bg-muted/50 p-sm">
                <Bell className="mt-0.5 h-4 w-4 text-secondary" />
                <div className="space-y-xs">
```

#### numeric-size (16)

- **Line 60:31** - `h-4`
  - Suggestion: Use size tokens through component token system

```
      >
        <Button variant="outline">
>         <User className="mr-sm [h-4] w-4" />
          Edit Profile
        </Button>
```

- **Line 60:35** - `w-4`
  - Suggestion: Use size tokens through component token system

```
      >
        <Button variant="outline">
>         <User className="mr-sm h-4 [w-4]" />
          Edit Profile
        </Button>
```

- **Line 230:35** - `h-4`
  - Suggestion: Use size tokens through component token system

```
            <CardHeader className="pb-sm">
              <CardTitle className="flex items-center gap-sm">
>               <Settings className="[h-4] w-4" />
                Quick Settings
              </CardTitle>
```

- **Line 230:39** - `w-4`
  - Suggestion: Use size tokens through component token system

```
            <CardHeader className="pb-sm">
              <CardTitle className="flex items-center gap-sm">
>               <Settings className="h-4 [w-4]" />
                Quick Settings
              </CardTitle>
```

- **Line 252:35** - `h-4`
  - Suggestion: Use size tokens through component token system

```
      >
        <Button variant="outline">
>         <Settings className="mr-sm [h-4] w-4" />
          Settings
        </Button>
```

_... and 11 more violations of this type_

#### typography-size (24)

- **Line 26:22** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="space-y-sm">
          <h4 className="font-medium leading-none">Settings</h4>
>         <p className="[text-sm] text-muted-foreground">Configure your application settings here.</p>
        </div>
      ),
```

- **Line 40:26** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <div className="space-y-sm">
              <h4 className="font-medium leading-none">User Profile</h4>
>             <p className="[text-sm] text-muted-foreground">Update your profile information.</p>
            </div>
            <div className="space-y-sm">
```

- **Line 75:26** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <div className="space-y-sm">
              <h4 className="font-medium">Primary Popover</h4>
>             <p className="[text-sm] text-muted-foreground">This is a primary popover.</p>
            </div>
          }
```

- **Line 87:26** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <div className="space-y-sm">
              <h4 className="font-medium">Accent Popover</h4>
>             <p className="[text-sm] text-muted-foreground">This is an accent popover.</p>
            </div>
          }
```

- **Line 99:26** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <div className="space-y-sm">
              <h4 className="font-medium">Secondary Popover</h4>
>             <p className="[text-sm] text-muted-foreground">This is a secondary popover.</p>
            </div>
          }
```

_... and 19 more violations of this type_

### src/components/overlays/Popover.tsx

**Violations:** 13

#### tailwind-bg-color (4)

- **Line 22:66** - `bg-secondary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        variant: {
          primary: `${POPOVER_TOKENS.content.background.default} ${POPOVER_TOKENS.content.text.default} ${POPOVER_TOKENS.content.border.color}`,
>         secondary: "border-secondary/50 text-secondary-foreground [bg-secondary]/10",
          accent: "border-accent/50 text-accent-foreground bg-accent/10",
          outline: "bg-background text-foreground border-border",
```

- **Line 23:57** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          primary: `${POPOVER_TOKENS.content.background.default} ${POPOVER_TOKENS.content.text.default} ${POPOVER_TOKENS.content.border.color}`,
          secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
>         accent: "border-accent/50 text-accent-foreground [bg-accent]/10",
          outline: "bg-background text-foreground border-border",
          ghost: "bg-transparent text-foreground border-transparent",
```

- **Line 24:18** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
          accent: "border-accent/50 text-accent-foreground bg-accent/10",
>         outline: "[bg-background] text-foreground border-border",
          ghost: "bg-transparent text-foreground border-transparent",
          link: "bg-transparent text-primary border-transparent",
```

- **Line 27:61** - `bg-destructive`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          ghost: "bg-transparent text-foreground border-transparent",
          link: "bg-transparent text-primary border-transparent",
>         destructive: "border-destructive/50 text-destructive [bg-destructive]/10",
        },
        size: {
```

#### tailwind-text-color (6)

- **Line 22:40** - `text-secondary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        variant: {
          primary: `${POPOVER_TOKENS.content.background.default} ${POPOVER_TOKENS.content.text.default} ${POPOVER_TOKENS.content.border.color}`,
>         secondary: "border-secondary/50 [text-secondary]-foreground bg-secondary/10",
          accent: "border-accent/50 text-accent-foreground bg-accent/10",
          outline: "bg-background text-foreground border-border",
```

- **Line 23:34** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          primary: `${POPOVER_TOKENS.content.background.default} ${POPOVER_TOKENS.content.text.default} ${POPOVER_TOKENS.content.border.color}`,
          secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
>         accent: "border-accent/50 [text-accent]-foreground bg-accent/10",
          outline: "bg-background text-foreground border-border",
          ghost: "bg-transparent text-foreground border-transparent",
```

- **Line 24:32** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
          accent: "border-accent/50 text-accent-foreground bg-accent/10",
>         outline: "bg-background [text-foreground] border-border",
          ghost: "bg-transparent text-foreground border-transparent",
          link: "bg-transparent text-primary border-transparent",
```

- **Line 25:31** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          accent: "border-accent/50 text-accent-foreground bg-accent/10",
          outline: "bg-background text-foreground border-border",
>         ghost: "bg-transparent [text-foreground] border-transparent",
          link: "bg-transparent text-primary border-transparent",
          destructive: "border-destructive/50 text-destructive bg-destructive/10",
```

- **Line 26:30** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          outline: "bg-background text-foreground border-border",
          ghost: "bg-transparent text-foreground border-transparent",
>         link: "bg-transparent [text-primary] border-transparent",
          destructive: "border-destructive/50 text-destructive bg-destructive/10",
        },
```

_... and 1 more violations of this type_

#### tailwind-border-color (3)

- **Line 22:20** - `border-secondary`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
        variant: {
          primary: `${POPOVER_TOKENS.content.background.default} ${POPOVER_TOKENS.content.text.default} ${POPOVER_TOKENS.content.border.color}`,
>         secondary: "[border-secondary]/50 text-secondary-foreground bg-secondary/10",
          accent: "border-accent/50 text-accent-foreground bg-accent/10",
          outline: "bg-background text-foreground border-border",
```

- **Line 23:17** - `border-accent`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
          primary: `${POPOVER_TOKENS.content.background.default} ${POPOVER_TOKENS.content.text.default} ${POPOVER_TOKENS.content.border.color}`,
          secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
>         accent: "[border-accent]/50 text-accent-foreground bg-accent/10",
          outline: "bg-background text-foreground border-border",
          ghost: "bg-transparent text-foreground border-transparent",
```

- **Line 27:22** - `border-destructive`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
          ghost: "bg-transparent text-foreground border-transparent",
          link: "bg-transparent text-primary border-transparent",
>         destructive: "[border-destructive]/50 text-destructive bg-destructive/10",
        },
        size: {
```

### src/components/overlays/Portal.stories.tsx

**Violations:** 18

#### tailwind-bg-color (5)

- **Line 41:80** - `bg-black`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          {show && (
            <Portal>
>             <div className="fixed inset-0 z-50 flex items-center justify-center [bg-black]/50">
                <div className="rounded-lg border bg-background p-lg shadow-lg">
                  <h2 className="mb-md text-lg font-semibold">Portal Content</h2>
```

- **Line 42:48** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            <Portal>
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
>               <div className="rounded-lg border [bg-background] p-lg shadow-lg">
                  <h2 className="mb-md text-lg font-semibold">Portal Content</h2>
                  <p className="mb-md text-sm text-muted-foreground">
```

- **Line 73:91** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                containerRef[0] = el;
              }}
>             className="mt-md min-h-[200px] rounded-md border-2 border-dashed border-border [bg-muted]/50"
            />
          </div>
```

- **Line 78:39** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          {show && containerRef[0] && (
            <Portal container={containerRef[0]}>
>             <div className="rounded-md [bg-primary] p-md text-primary-foreground">
                This content is portaled into the custom container above.
              </div>
```

- **Line 105:64** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          </p>
          <Portal>
>           <div className="fixed right-md top-md z-50 rounded-md [bg-primary] p-md text-primary-foreground">
              This only appears on the client side.
            </div>
```

#### tailwind-text-color (4)

- **Line 44:44** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                <div className="rounded-lg border bg-background p-lg shadow-lg">
                  <h2 className="mb-md text-lg font-semibold">Portal Content</h2>
>                 <p className="mb-md text-sm [text-muted]-foreground">
                    This content is rendered via Portal outside the normal DOM hierarchy.
                  </p>
```

- **Line 78:55** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          {show && containerRef[0] && (
            <Portal container={containerRef[0]}>
>             <div className="rounded-md bg-primary p-md [text-primary]-foreground">
                This content is portaled into the custom container above.
              </div>
```

- **Line 100:30** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      return (
        <div className="space-y-md">
>         <p className="text-sm [text-muted]-foreground">
            The Portal component checks for window/document availability before rendering, making it
            safe for server-side rendering. On the server, it returns null.
```

- **Line 105:80** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          </p>
          <Portal>
>           <div className="fixed right-md top-md z-50 rounded-md bg-primary p-md [text-primary]-foreground">
              This only appears on the client side.
            </div>
```

#### numeric-radius (5)

- **Line 42:30** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
            <Portal>
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
>               <div className="[rounded-lg] border bg-background p-lg shadow-lg">
                  <h2 className="mb-md text-lg font-semibold">Portal Content</h2>
                  <p className="mb-md text-sm text-muted-foreground">
```

- **Line 64:24** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
      return (
        <>
>         <div className="[rounded-lg] border border-border p-lg">
            <p className="mb-md text-sm">
              Custom container (the portal will render into the box below):
```

- **Line 73:43** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
                containerRef[0] = el;
              }}
>             className="mt-md min-h-[200px] [rounded-md] border-2 border-dashed border-border bg-muted/50"
            />
          </div>
```

- **Line 78:28** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
          {show && containerRef[0] && (
            <Portal container={containerRef[0]}>
>             <div className="[rounded-md] bg-primary p-md text-primary-foreground">
                This content is portaled into the custom container above.
              </div>
```

- **Line 105:53** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
          </p>
          <Portal>
>           <div className="fixed right-md top-md z-50 [rounded-md] bg-primary p-md text-primary-foreground">
              This only appears on the client side.
            </div>
```

#### typography-size (4)

- **Line 43:37** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="rounded-lg border bg-background p-lg shadow-lg">
>                 <h2 className="mb-md [text-lg] font-semibold">Portal Content</h2>
                  <p className="mb-md text-sm text-muted-foreground">
                    This content is rendered via Portal outside the normal DOM hierarchy.
```

- **Line 44:36** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                <div className="rounded-lg border bg-background p-lg shadow-lg">
                  <h2 className="mb-md text-lg font-semibold">Portal Content</h2>
>                 <p className="mb-md [text-sm] text-muted-foreground">
                    This content is rendered via Portal outside the normal DOM hierarchy.
                  </p>
```

- **Line 65:30** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <>
          <div className="rounded-lg border border-border p-lg">
>           <p className="mb-md [text-sm]">
              Custom container (the portal will render into the box below):
            </p>
```

- **Line 100:22** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      return (
        <div className="space-y-md">
>         <p className="[text-sm] text-muted-foreground">
            The Portal component checks for window/document availability before rendering, making it
            safe for server-side rendering. On the server, it returns null.
```

### src/components/overlays/Toast.stories.tsx

**Violations:** 29

#### tailwind-bg-color (6)

- **Line 43:30** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            })
          }
>         className="rounded-md [bg-primary] px-md py-sm text-primary-foreground"
        >
          Show Default Toast
```

- **Line 87:30** - `bg-destructive`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            toast.toast({ title: "Error", description: "Something went wrong!", variant: "danger" })
          }
>         className="rounded-md [bg-destructive] px-md py-sm text-destructive-foreground"
        >
          Show Error Toast
```

- **Line 137:30** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            })
          }
>         className="rounded-md [bg-primary] px-md py-sm text-primary-foreground"
        >
          Show Toast with Action
```

- **Line 156:30** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            toast.toast({ title: "Toast 4", variant: "danger" });
          }}
>         className="rounded-md [bg-primary] px-md py-sm text-primary-foreground"
        >
          Show Multiple Toasts
```

- **Line 171:66** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <button
            onClick={() => toast.toast({ title: "Default", variant: "default" })}
>           className="block w-full rounded-md border border-border [bg-background] px-md py-sm"
          >
            Default
```

_... and 1 more violations of this type_

#### tailwind-text-color (5)

- **Line 43:53** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            })
          }
>         className="rounded-md bg-primary px-md py-sm [text-primary]-foreground"
        >
          Show Default Toast
```

- **Line 87:57** - `text-destructive`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            toast.toast({ title: "Error", description: "Something went wrong!", variant: "danger" })
          }
>         className="rounded-md bg-destructive px-md py-sm [text-destructive]-foreground"
        >
          Show Error Toast
```

- **Line 137:53** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            })
          }
>         className="rounded-md bg-primary px-md py-sm [text-primary]-foreground"
        >
          Show Toast with Action
```

- **Line 156:53** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            toast.toast({ title: "Toast 4", variant: "danger" });
          }}
>         className="rounded-md bg-primary px-md py-sm [text-primary]-foreground"
        >
          Show Multiple Toasts
```

- **Line 195:72** - `text-destructive`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <button
            onClick={() => toast.toast({ title: "Danger", variant: "danger" })}
>           className="block w-full rounded-md bg-destructive px-md py-sm [text-destructive]-foreground"
          >
            Danger
```

#### numeric-radius (13)

- **Line 43:19** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
            })
          }
>         className="[rounded-md] bg-primary px-md py-sm text-primary-foreground"
        >
          Show Default Toast
```

- **Line 55:19** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
            })
          }
>         className="[rounded-md] bg-success px-md py-sm text-success-foreground"
        >
          Show Success Toast
```

- **Line 67:19** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
            })
          }
>         className="[rounded-md] bg-info px-md py-sm text-info-foreground"
        >
          Show Info Toast
```

- **Line 79:19** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
            })
          }
>         className="[rounded-md] bg-warning px-md py-sm text-warning-foreground"
        >
          Show Warning Toast
```

- **Line 87:19** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
            toast.toast({ title: "Error", description: "Something went wrong!", variant: "danger" })
          }
>         className="[rounded-md] bg-destructive px-md py-sm text-destructive-foreground"
        >
          Show Error Toast
```

_... and 8 more violations of this type_

#### numeric-size (5)

- **Line 171:27** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          <button
            onClick={() => toast.toast({ title: "Default", variant: "default" })}
>           className="block [w-full] rounded-md border border-border bg-background px-md py-sm"
          >
            Default
```

- **Line 177:27** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          <button
            onClick={() => toast.toast({ title: "Success", variant: "success" })}
>           className="block [w-full] rounded-md bg-success px-md py-sm text-success-foreground"
          >
            Success
```

- **Line 183:27** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          <button
            onClick={() => toast.toast({ title: "Info", variant: "info" })}
>           className="block [w-full] rounded-md bg-info px-md py-sm text-info-foreground"
          >
            Info
```

- **Line 189:27** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          <button
            onClick={() => toast.toast({ title: "Warning", variant: "warning" })}
>           className="block [w-full] rounded-md bg-warning px-md py-sm text-warning-foreground"
          >
            Warning
```

- **Line 195:27** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          <button
            onClick={() => toast.toast({ title: "Danger", variant: "danger" })}
>           className="block [w-full] rounded-md bg-destructive px-md py-sm text-destructive-foreground"
          >
            Danger
```

### src/components/overlays/Toast.tsx

**Violations:** 2

#### numeric-size (2)

- **Line 172:24** - `h-4`
  - Suggestion: Use size tokens through component token system

```
            aria-label="Dismiss toast"
          >
>           <X className="[h-4] w-4" />
          </Button>
        </div>
```

- **Line 172:28** - `w-4`
  - Suggestion: Use size tokens through component token system

```
            aria-label="Dismiss toast"
          >
>           <X className="h-4 [w-4]" />
          </Button>
        </div>
```

### src/components/overlays/ToastViewport.tsx

**Violations:** 3

#### numeric-spacing (1)

- **Line 62:58** - `p-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            className={cn(
              positionClasses[position],
>             "max-h-screen w-full max-w-md overflow-hidden [p-0]",
              className,
            )}
```

#### numeric-size (2)

- **Line 62:13** - `max-h-screen`
  - Suggestion: Use size tokens through component token system

```
            className={cn(
              positionClasses[position],
>             "[max-h-screen] w-full max-w-md overflow-hidden p-0",
              className,
            )}
```

- **Line 62:26** - `w-full`
  - Suggestion: Use size tokens through component token system

```
            className={cn(
              positionClasses[position],
>             "max-h-screen [w-full] max-w-md overflow-hidden p-0",
              className,
            )}
```

### src/components/overlays/Tooltip.stories.tsx

**Violations:** 9

#### tailwind-text-color (3)

- **Line 100:37** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              variant="primary"
            >
>             <Info className="h-4 w-4 [text-muted]-foreground" />
            </TooltipWrapper>
          </div>
```

- **Line 110:43** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <Label htmlFor="password">Password</Label>
            <TooltipWrapper content="Password must be at least 8 characters long" variant="secondary">
>             <HelpCircle className="h-4 w-4 [text-muted]-foreground" />
            </TooltipWrapper>
          </div>
```

- **Line 120:44** - `text-destructive`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <TooltipWrapper content="Passwords do not match" variant="destructive">
>             <AlertCircle className="h-4 w-4 [text-destructive]" />
            </TooltipWrapper>
          </div>
```

#### numeric-size (6)

- **Line 100:29** - `h-4`
  - Suggestion: Use size tokens through component token system

```
              variant="primary"
            >
>             <Info className="[h-4] w-4 text-muted-foreground" />
            </TooltipWrapper>
          </div>
```

- **Line 100:33** - `w-4`
  - Suggestion: Use size tokens through component token system

```
              variant="primary"
            >
>             <Info className="h-4 [w-4] text-muted-foreground" />
            </TooltipWrapper>
          </div>
```

- **Line 110:35** - `h-4`
  - Suggestion: Use size tokens through component token system

```
            <Label htmlFor="password">Password</Label>
            <TooltipWrapper content="Password must be at least 8 characters long" variant="secondary">
>             <HelpCircle className="[h-4] w-4 text-muted-foreground" />
            </TooltipWrapper>
          </div>
```

- **Line 110:39** - `w-4`
  - Suggestion: Use size tokens through component token system

```
            <Label htmlFor="password">Password</Label>
            <TooltipWrapper content="Password must be at least 8 characters long" variant="secondary">
>             <HelpCircle className="h-4 [w-4] text-muted-foreground" />
            </TooltipWrapper>
          </div>
```

- **Line 120:36** - `h-4`
  - Suggestion: Use size tokens through component token system

```
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <TooltipWrapper content="Passwords do not match" variant="destructive">
>             <AlertCircle className="[h-4] w-4 text-destructive" />
            </TooltipWrapper>
          </div>
```

_... and 1 more violations of this type_

### src/components/overlays/Tooltip.tsx

**Violations:** 13

#### tailwind-bg-color (4)

- **Line 22:66** - `bg-secondary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        variant: {
          primary: `${TOOLTIP_TOKENS.content.background.default} ${TOOLTIP_TOKENS.content.text.default} ${TOOLTIP_TOKENS.content.border.color}`,
>         secondary: "border-secondary/50 text-secondary-foreground [bg-secondary]/10",
          accent: "border-accent/50 text-accent-foreground bg-accent/10",
          outline: "bg-background text-foreground border-border",
```

- **Line 23:57** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          primary: `${TOOLTIP_TOKENS.content.background.default} ${TOOLTIP_TOKENS.content.text.default} ${TOOLTIP_TOKENS.content.border.color}`,
          secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
>         accent: "border-accent/50 text-accent-foreground [bg-accent]/10",
          outline: "bg-background text-foreground border-border",
          ghost: "bg-transparent text-foreground border-transparent",
```

- **Line 24:18** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
          accent: "border-accent/50 text-accent-foreground bg-accent/10",
>         outline: "[bg-background] text-foreground border-border",
          ghost: "bg-transparent text-foreground border-transparent",
          link: "bg-transparent text-primary border-transparent",
```

- **Line 27:61** - `bg-destructive`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          ghost: "bg-transparent text-foreground border-transparent",
          link: "bg-transparent text-primary border-transparent",
>         destructive: "border-destructive/50 text-destructive [bg-destructive]/10",
        },
      },
```

#### tailwind-text-color (6)

- **Line 22:40** - `text-secondary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        variant: {
          primary: `${TOOLTIP_TOKENS.content.background.default} ${TOOLTIP_TOKENS.content.text.default} ${TOOLTIP_TOKENS.content.border.color}`,
>         secondary: "border-secondary/50 [text-secondary]-foreground bg-secondary/10",
          accent: "border-accent/50 text-accent-foreground bg-accent/10",
          outline: "bg-background text-foreground border-border",
```

- **Line 23:34** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          primary: `${TOOLTIP_TOKENS.content.background.default} ${TOOLTIP_TOKENS.content.text.default} ${TOOLTIP_TOKENS.content.border.color}`,
          secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
>         accent: "border-accent/50 [text-accent]-foreground bg-accent/10",
          outline: "bg-background text-foreground border-border",
          ghost: "bg-transparent text-foreground border-transparent",
```

- **Line 24:32** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
          accent: "border-accent/50 text-accent-foreground bg-accent/10",
>         outline: "bg-background [text-foreground] border-border",
          ghost: "bg-transparent text-foreground border-transparent",
          link: "bg-transparent text-primary border-transparent",
```

- **Line 25:31** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          accent: "border-accent/50 text-accent-foreground bg-accent/10",
          outline: "bg-background text-foreground border-border",
>         ghost: "bg-transparent [text-foreground] border-transparent",
          link: "bg-transparent text-primary border-transparent",
          destructive: "border-destructive/50 text-destructive bg-destructive/10",
```

- **Line 26:30** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          outline: "bg-background text-foreground border-border",
          ghost: "bg-transparent text-foreground border-transparent",
>         link: "bg-transparent [text-primary] border-transparent",
          destructive: "border-destructive/50 text-destructive bg-destructive/10",
        },
```

_... and 1 more violations of this type_

#### tailwind-border-color (3)

- **Line 22:20** - `border-secondary`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
        variant: {
          primary: `${TOOLTIP_TOKENS.content.background.default} ${TOOLTIP_TOKENS.content.text.default} ${TOOLTIP_TOKENS.content.border.color}`,
>         secondary: "[border-secondary]/50 text-secondary-foreground bg-secondary/10",
          accent: "border-accent/50 text-accent-foreground bg-accent/10",
          outline: "bg-background text-foreground border-border",
```

- **Line 23:17** - `border-accent`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
          primary: `${TOOLTIP_TOKENS.content.background.default} ${TOOLTIP_TOKENS.content.text.default} ${TOOLTIP_TOKENS.content.border.color}`,
          secondary: "border-secondary/50 text-secondary-foreground bg-secondary/10",
>         accent: "[border-accent]/50 text-accent-foreground bg-accent/10",
          outline: "bg-background text-foreground border-border",
          ghost: "bg-transparent text-foreground border-transparent",
```

- **Line 27:22** - `border-destructive`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
          ghost: "bg-transparent text-foreground border-transparent",
          link: "bg-transparent text-primary border-transparent",
>         destructive: "[border-destructive]/50 text-destructive bg-destructive/10",
        },
      },
```

## Cards Components

**Total:** 70 violations

### src/components/cards/ArtistCard/ArtistCard.tsx

**Violations:** 6

#### tailwind-text-color (1)

- **Line 155:29** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                  TEXT_TOKENS.fontWeight.bold,
                  MOTION_TOKENS.transition.colors,
>                 "group-hover:[text-primary]",
                  size === "compact"
                    ? DOMAIN_TOKENS.spacing.section.titleToSubtitle
```

#### numeric-size (5)

- **Line 120:39** - `w-full`
  - Suggestion: Use size tokens through component token system

```
            {showImage && (
              <CardBaseImageWrapper size={size}>
>               <div className="relative [w-full] overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  {imageUrl ? (
                    <img
```

- **Line 125:35** - `h-full`
  - Suggestion: Use size tokens through component token system

```
                      src={imageUrl}
                      alt={name}
>                     className={cn("[h-full] w-full", artistCardImageTransformVariants({ size }))}
                    />
                  ) : (
```

- **Line 125:42** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                      src={imageUrl}
                      alt={name}
>                     className={cn("h-full [w-full]", artistCardImageTransformVariants({ size }))}
                    />
                  ) : (
```

- **Line 128:39** - `h-full`
  - Suggestion: Use size tokens through component token system

```
                    />
                  ) : (
>                   <div className="flex [h-full] w-full items-center justify-center">
                      {/* Placeholder icon - using info as fallback since music/artist icon doesn't exist in registry */}
                      <Icon
```

- **Line 128:46** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                    />
                  ) : (
>                   <div className="flex h-full [w-full] items-center justify-center">
                      {/* Placeholder icon - using info as fallback since music/artist icon doesn't exist in registry */}
                      <Icon
```

### src/components/cards/CardBase/CardBase.stories.tsx

**Violations:** 18

#### hex-color (18)

- **Line 65:49** - `#667eea`
  - Suggestion: Use hsl(var(--token)) through token system

```
              width: "100%",
              height: "100%",
>             background: "linear-gradient(135deg, [#667eea] 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
```

- **Line 65:61** - `#764ba2`
  - Suggestion: Use hsl(var(--token)) through token system

```
              width: "100%",
              height: "100%",
>             background: "linear-gradient(135deg, #667eea 0%, [#764ba2] 100%)",
              display: "flex",
              alignItems: "center",
```

- **Line 114:49** - `#667eea`
  - Suggestion: Use hsl(var(--token)) through token system

```
              width: "100%",
              height: "100%",
>             background: "linear-gradient(135deg, [#667eea] 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
```

- **Line 114:61** - `#764ba2`
  - Suggestion: Use hsl(var(--token)) through token system

```
              width: "100%",
              height: "100%",
>             background: "linear-gradient(135deg, #667eea 0%, [#764ba2] 100%)",
              display: "flex",
              alignItems: "center",
```

- **Line 161:49** - `#667eea`
  - Suggestion: Use hsl(var(--token)) through token system

```
              width: "100%",
              height: "100%",
>             background: "linear-gradient(135deg, [#667eea] 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
```

_... and 13 more violations of this type_

### src/components/cards/CategoryCard/CategoryCard.tsx

**Violations:** 8

#### tailwind-text-color (1)

- **Line 130:60** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                level={3}
                className={cn(
>                 "line-clamp-2 transition-colors group-hover:[text-primary]",
                  TEXT_TOKENS.fontSize.lg,
                  TEXT_TOKENS.fontWeight.bold,
```

#### numeric-size (5)

- **Line 91:39** - `w-full`
  - Suggestion: Use size tokens through component token system

```
            {showImage && (
              <CardBaseImageWrapper size={size}>
>               <div className="relative [w-full] overflow-hidden bg-gradient-to-br from-surface-elevated1 to-surface-elevated2">
                  {imageUrl ? (
                    <img
```

- **Line 97:23** - `h-full`
  - Suggestion: Use size tokens through component token system

```
                      alt={title}
                      className={cn(
>                       "[h-full] w-full object-cover",
                        DOMAIN_TOKENS.motion.hover.transition,
                        DOMAIN_TOKENS.motion.hover.scale,
```

- **Line 97:30** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                      alt={title}
                      className={cn(
>                       "h-full [w-full] object-cover",
                        DOMAIN_TOKENS.motion.hover.transition,
                        DOMAIN_TOKENS.motion.hover.scale,
```

- **Line 103:39** - `h-full`
  - Suggestion: Use size tokens through component token system

```
                    />
                  ) : (
>                   <div className="flex [h-full] w-full items-center justify-center">
                      <Icon
                        name="info"
```

- **Line 103:46** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                    />
                  ) : (
>                   <div className="flex h-full [w-full] items-center justify-center">
                      <Icon
                        name="info"
```

#### transition-utility (2)

- **Line 116:48** - `transition-opacity`
  - Suggestion: Use MOTION_TOKENS for transitions

```
                  <div
                    className={cn(
>                     "absolute inset-0 opacity-0 [transition-opacity] duration-normal group-hover:opacity-100",
                      DOMAIN_TOKENS.image.overlay.gradient,
                    )}
```

- **Line 130:30** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
                level={3}
                className={cn(
>                 "line-clamp-2 [transition-colors] group-hover:text-primary",
                  TEXT_TOKENS.fontSize.lg,
                  TEXT_TOKENS.fontWeight.bold,
```

### src/components/cards/EventCard/EventCard.tsx

**Violations:** 10

#### tailwind-text-color (1)

- **Line 145:60** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                level={3}
                className={cn(
>                 "line-clamp-2 transition-colors group-hover:[text-primary]",
                  TEXT_TOKENS.fontSize.lg,
                  TEXT_TOKENS.fontWeight.bold,
```

#### numeric-size (7)

- **Line 106:39** - `w-full`
  - Suggestion: Use size tokens through component token system

```
            {showImage && (
              <CardBaseImageWrapper size={size}>
>               <div className="relative [w-full] overflow-hidden bg-gradient-to-br from-surface-elevated1 to-surface-elevated2">
                  {imageUrl ? (
                    <img
```

- **Line 112:23** - `h-full`
  - Suggestion: Use size tokens through component token system

```
                      alt={title}
                      className={cn(
>                       "[h-full] w-full object-cover",
                        DOMAIN_TOKENS.motion.hover.transition,
                        DOMAIN_TOKENS.motion.hover.scale,
```

- **Line 112:30** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                      alt={title}
                      className={cn(
>                       "h-full [w-full] object-cover",
                        DOMAIN_TOKENS.motion.hover.transition,
                        DOMAIN_TOKENS.motion.hover.scale,
```

- **Line 118:39** - `h-full`
  - Suggestion: Use size tokens through component token system

```
                    />
                  ) : (
>                   <div className="flex [h-full] w-full items-center justify-center">
                      <Icon
                        name="info"
```

- **Line 118:46** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                    />
                  ) : (
>                   <div className="flex h-full [w-full] items-center justify-center">
                      <Icon
                        name="info"
```

_... and 2 more violations of this type_

#### transition-utility (2)

- **Line 131:48** - `transition-opacity`
  - Suggestion: Use MOTION_TOKENS for transitions

```
                  <div
                    className={cn(
>                     "absolute inset-0 opacity-0 [transition-opacity] duration-normal group-hover:opacity-100",
                      DOMAIN_TOKENS.image.overlay.gradient,
                    )}
```

- **Line 145:30** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
                level={3}
                className={cn(
>                 "line-clamp-2 [transition-colors] group-hover:text-primary",
                  TEXT_TOKENS.fontSize.lg,
                  TEXT_TOKENS.fontWeight.bold,
```

### src/components/cards/PromoCard/PromoCard.tsx

**Violations:** 11

#### tailwind-text-color (1)

- **Line 138:60** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                level={3}
                className={cn(
>                 "line-clamp-2 transition-colors group-hover:[text-primary]",
                  TEXT_TOKENS.fontSize.lg,
                  TEXT_TOKENS.fontWeight.bold,
```

#### numeric-size (8)

- **Line 99:39** - `w-full`
  - Suggestion: Use size tokens through component token system

```
            {showImage && (
              <CardBaseImageWrapper size={size}>
>               <div className="relative [w-full] overflow-hidden bg-gradient-to-br from-surface-elevated1 to-surface-elevated2">
                  {imageUrl ? (
                    <img
```

- **Line 105:23** - `h-full`
  - Suggestion: Use size tokens through component token system

```
                      alt={title}
                      className={cn(
>                       "[h-full] w-full object-cover",
                        DOMAIN_TOKENS.motion.hover.transition,
                        DOMAIN_TOKENS.motion.hover.scale,
```

- **Line 105:30** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                      alt={title}
                      className={cn(
>                       "h-full [w-full] object-cover",
                        DOMAIN_TOKENS.motion.hover.transition,
                        DOMAIN_TOKENS.motion.hover.scale,
```

- **Line 111:39** - `h-full`
  - Suggestion: Use size tokens through component token system

```
                    />
                  ) : (
>                   <div className="flex [h-full] w-full items-center justify-center">
                      <Icon
                        name="info"
```

- **Line 111:46** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                    />
                  ) : (
>                   <div className="flex h-full [w-full] items-center justify-center">
                      <Icon
                        name="info"
```

_... and 3 more violations of this type_

#### transition-utility (2)

- **Line 124:48** - `transition-opacity`
  - Suggestion: Use MOTION_TOKENS for transitions

```
                  <div
                    className={cn(
>                     "absolute inset-0 opacity-0 [transition-opacity] duration-normal group-hover:opacity-100",
                      DOMAIN_TOKENS.image.overlay.gradient,
                    )}
```

- **Line 138:30** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
                level={3}
                className={cn(
>                 "line-clamp-2 [transition-colors] group-hover:text-primary",
                  TEXT_TOKENS.fontSize.lg,
                  TEXT_TOKENS.fontWeight.bold,
```

### src/components/cards/TicketCard/TicketCard.tsx

**Violations:** 11

#### tailwind-text-color (1)

- **Line 199:60** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                level={3}
                className={cn(
>                 "line-clamp-2 transition-colors group-hover:[text-primary]",
                  TEXT_TOKENS.fontSize.lg,
                  TEXT_TOKENS.fontWeight.bold,
```

#### numeric-size (8)

- **Line 160:39** - `w-full`
  - Suggestion: Use size tokens through component token system

```
            {showImage && (
              <CardBaseImageWrapper size={size}>
>               <div className="relative [w-full] overflow-hidden bg-gradient-to-br from-surface-elevated1 to-surface-elevated2">
                  {imageUrl ? (
                    <img
```

- **Line 166:23** - `h-full`
  - Suggestion: Use size tokens through component token system

```
                      alt={title}
                      className={cn(
>                       "[h-full] w-full object-cover",
                        DOMAIN_TOKENS.motion.hover.transition,
                        DOMAIN_TOKENS.motion.hover.scale,
```

- **Line 166:30** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                      alt={title}
                      className={cn(
>                       "h-full [w-full] object-cover",
                        DOMAIN_TOKENS.motion.hover.transition,
                        DOMAIN_TOKENS.motion.hover.scale,
```

- **Line 172:39** - `h-full`
  - Suggestion: Use size tokens through component token system

```
                    />
                  ) : (
>                   <div className="flex [h-full] w-full items-center justify-center">
                      <Icon
                        name="info"
```

- **Line 172:46** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                    />
                  ) : (
>                   <div className="flex h-full [w-full] items-center justify-center">
                      <Icon
                        name="info"
```

_... and 3 more violations of this type_

#### transition-utility (2)

- **Line 185:48** - `transition-opacity`
  - Suggestion: Use MOTION_TOKENS for transitions

```
                  <div
                    className={cn(
>                     "absolute inset-0 opacity-0 [transition-opacity] duration-normal group-hover:opacity-100",
                      DOMAIN_TOKENS.image.overlay.gradient,
                    )}
```

- **Line 199:30** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
                level={3}
                className={cn(
>                 "line-clamp-2 [transition-colors] group-hover:text-primary",
                  TEXT_TOKENS.fontSize.lg,
                  TEXT_TOKENS.fontWeight.bold,
```

### src/components/cards/VenueCard/VenueCard.tsx

**Violations:** 6

#### tailwind-text-color (1)

- **Line 153:27** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                TEXT_TOKENS.fontWeight.bold,
                MOTION_TOKENS.transition.colors,
>               "group-hover:[text-primary]",
                size === "compact"
                  ? DOMAIN_TOKENS.spacing.section.titleToSubtitle
```

#### numeric-size (5)

- **Line 118:37** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          {showImage && (
            <CardBaseImageWrapper size={cardBaseSize}>
>             <div className="relative [w-full] overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                {imageUrl ? (
                  <img
```

- **Line 123:33** - `h-full`
  - Suggestion: Use size tokens through component token system

```
                    src={imageUrl}
                    alt={name}
>                   className={cn("[h-full] w-full", venueCardImageTransformVariants({ size }))}
                  />
                ) : (
```

- **Line 123:40** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                    src={imageUrl}
                    alt={name}
>                   className={cn("h-full [w-full]", venueCardImageTransformVariants({ size }))}
                  />
                ) : (
```

- **Line 126:37** - `h-full`
  - Suggestion: Use size tokens through component token system

```
                  />
                ) : (
>                 <div className="flex [h-full] w-full items-center justify-center">
                    {/* Placeholder icon - using info as fallback since building icon doesn't exist */}
                    <Icon
```

- **Line 126:44** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                  />
                ) : (
>                 <div className="flex h-full [w-full] items-center justify-center">
                    {/* Placeholder icon - using info as fallback since building icon doesn't exist */}
                    <Icon
```

## Filters Components

**Total:** 116 violations

### src/components/filters/DateRangePicker.tsx

**Violations:** 18

#### tailwind-bg-color (4)

- **Line 101:85** - `bg-popover`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```

        {isOpen && (
>         <div className="absolute left-0 top-full z-50 mt-xs w-full rounded-md border [bg-popover] p-sm shadow-lg">
            <div className="space-y-sm">
              <div className="text-sm font-medium">{selectDateRangeLabel}</div>
```

- **Line 125:53** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                      key={i}
                      className={cn(
>                       "h-8 w-8 rounded text-sm hover:[bg-accent]",
                        isSelected && "bg-primary text-primary-foreground",
                        isInRange && "bg-accent/50",
```

- **Line 126:37** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                      className={cn(
                        "h-8 w-8 rounded text-sm hover:bg-accent",
>                       isSelected && "[bg-primary] text-primary-foreground",
                        isInRange && "bg-accent/50",
                      )}
```

- **Line 127:36** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                        "h-8 w-8 rounded text-sm hover:bg-accent",
                        isSelected && "bg-primary text-primary-foreground",
>                       isInRange && "[bg-accent]/50",
                      )}
                      onClick={() => handleDateSelect(date)}
```

#### tailwind-text-color (3)

- **Line 91:26** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          className={cn(
            "w-full justify-start text-left font-normal",
>           !value.from && "[text-muted]-foreground",
          )}
          onClick={() => setIsOpen(!isOpen)}
```

- **Line 107:71** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                {/* Calendar header */}
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
>                 <div key={day} className="p-sm text-center font-medium [text-muted]-foreground">
                    {day}
                  </div>
```

- **Line 126:48** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                      className={cn(
                        "h-8 w-8 rounded text-sm hover:bg-accent",
>                       isSelected && "bg-primary [text-primary]-foreground",
                        isInRange && "bg-accent/50",
                      )}
```

#### numeric-spacing (1)

- **Line 101:33** - `left-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```

        {isOpen && (
>         <div className="absolute [left-0] top-full z-50 mt-xs w-full rounded-md border bg-popover p-sm shadow-lg">
            <div className="space-y-sm">
              <div className="text-sm font-medium">{selectDateRangeLabel}</div>
```

#### numeric-radius (1)

- **Line 101:67** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```

        {isOpen && (
>         <div className="absolute left-0 top-full z-50 mt-xs w-full [rounded-md] border bg-popover p-sm shadow-lg">
            <div className="space-y-sm">
              <div className="text-sm font-medium">{selectDateRangeLabel}</div>
```

#### numeric-size (6)

- **Line 90:11** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          variant="outline"
          className={cn(
>           "[w-full] justify-start text-left font-normal",
            !value.from && "text-muted-foreground",
          )}
```

- **Line 96:39** - `h-4`
  - Suggestion: Use size tokens through component token system

```
          disabled={disabled}
        >
>         <CalendarIcon className="mr-sm [h-4] w-4" />
          {formatDateRange(value)}
        </Button>
```

- **Line 96:43** - `w-4`
  - Suggestion: Use size tokens through component token system

```
          disabled={disabled}
        >
>         <CalendarIcon className="mr-sm h-4 [w-4]" />
          {formatDateRange(value)}
        </Button>
```

- **Line 101:60** - `w-full`
  - Suggestion: Use size tokens through component token system

```

        {isOpen && (
>         <div className="absolute left-0 top-full z-50 mt-xs [w-full] rounded-md border bg-popover p-sm shadow-lg">
            <div className="space-y-sm">
              <div className="text-sm font-medium">{selectDateRangeLabel}</div>
```

- **Line 125:23** - `h-8`
  - Suggestion: Use size tokens through component token system

```
                      key={i}
                      className={cn(
>                       "[h-8] w-8 rounded text-sm hover:bg-accent",
                        isSelected && "bg-primary text-primary-foreground",
                        isInRange && "bg-accent/50",
```

_... and 1 more violations of this type_

#### typography-size (3)

- **Line 103:28** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <div className="absolute left-0 top-full z-50 mt-xs w-full rounded-md border bg-popover p-sm shadow-lg">
            <div className="space-y-sm">
>             <div className="[text-sm] font-medium">{selectDateRangeLabel}</div>
              <div className="grid grid-cols-7 gap-xs text-xs">
                {/* Calendar header */}
```

- **Line 104:52** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <div className="space-y-sm">
              <div className="text-sm font-medium">{selectDateRangeLabel}</div>
>             <div className="grid grid-cols-7 gap-xs [text-xs]">
                {/* Calendar header */}
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
```

- **Line 125:39** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                      key={i}
                      className={cn(
>                       "h-8 w-8 rounded [text-sm] hover:bg-accent",
                        isSelected && "bg-primary text-primary-foreground",
                        isInRange && "bg-accent/50",
```

### src/components/filters/FilterBar.tsx

**Violations:** 10

#### tailwind-bg-color (1)

- **Line 302:35** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        {/* Active Filters Summary */}
        {hasActiveFilters && (
>         <div className="rounded-lg [bg-muted]/50 p-sm">
            <div className="mb-sm text-sm font-medium">{activeFiltersLabel}</div>
            <div className="flex flex-wrap gap-sm">
```

#### numeric-radius (1)

- **Line 302:24** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
        {/* Active Filters Summary */}
        {hasActiveFilters && (
>         <div className="[rounded-lg] bg-muted/50 p-sm">
            <div className="mb-sm text-sm font-medium">{activeFiltersLabel}</div>
            <div className="flex flex-wrap gap-sm">
```

#### numeric-size (4)

- **Line 210:33** - `h-3`
  - Suggestion: Use size tokens through component token system

```
            <div className="flex items-center gap-sm">
              <Badge variant="secondary" className="gap-xs">
>               <Filter className="[h-3] w-3" />
                {getFilterSummary().length} {filtersLabel}
              </Badge>
```

- **Line 210:37** - `w-3`
  - Suggestion: Use size tokens through component token system

```
            <div className="flex items-center gap-sm">
              <Badge variant="secondary" className="gap-xs">
>               <Filter className="h-3 [w-3]" />
                {getFilterSummary().length} {filtersLabel}
              </Badge>
```

- **Line 214:28** - `h-3`
  - Suggestion: Use size tokens through component token system

```
              </Badge>
              <Button variant="outline" size="sm" onClick={clearAllFilters} className="gap-xs">
>               <X className="[h-3] w-3" />
                {clearAllLabel}
              </Button>
```

- **Line 214:32** - `w-3`
  - Suggestion: Use size tokens through component token system

```
              </Badge>
              <Button variant="outline" size="sm" onClick={clearAllFilters} className="gap-xs">
>               <X className="h-3 [w-3]" />
                {clearAllLabel}
              </Button>
```

#### typography-size (4)

- **Line 235:30** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          {showDateRange && (
            <div className="space-y-sm">
>             <label className="[text-sm] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {dateRangeLabel}
              </label>
```

- **Line 272:30** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          {showSorting && (
            <div className="space-y-sm">
>             <label className="[text-sm] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {sortByLabel}
              </label>
```

- **Line 303:32** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        {hasActiveFilters && (
          <div className="rounded-lg bg-muted/50 p-sm">
>           <div className="mb-sm [text-sm] font-medium">{activeFiltersLabel}</div>
            <div className="flex flex-wrap gap-sm">
              {getFilterSummary().map((filter, index) => (
```

- **Line 306:62** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <div className="flex flex-wrap gap-sm">
              {getFilterSummary().map((filter, index) => (
>               <Badge key={index} variant="outline" className="[text-xs]">
                  {filter}
                </Badge>
```

### src/components/filters/FilterSelect.tsx

**Violations:** 38

#### tailwind-bg-color (4)

- **Line 24:84** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "flex h-10 w-full items-center justify-between rounded-md border border-input [bg-background] px-sm py-sm text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className,
      )}
```

- **Line 73:416** - `bg-popover`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        ref={ref}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border [bg-popover] text-popover-foreground shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
```

- **Line 116:123** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "relative flex w-full cursor-default select-none items-center rounded-sm py-xs pl-8 pr-sm text-sm outline-none focus:[bg-accent] focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
```

- **Line 138:37** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
    <SelectPrimitive.Separator
      ref={ref}
>     className={cn("-mx-xs my-xs h-px [bg-muted]", className)}
      {...props}
    />
```

#### tailwind-text-color (4)

- **Line 24:153** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-sm py-sm text-sm ring-offset-background placeholder:[text-muted]-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className,
      )}
```

- **Line 73:427** - `text-popover`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        ref={ref}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover [text-popover]-foreground shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
```

- **Line 116:139** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "relative flex w-full cursor-default select-none items-center rounded-sm py-xs pl-8 pr-sm text-sm outline-none focus:bg-accent focus:[text-accent]-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
```

- **Line 190:51** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                    <span>{option.label}</span>
                    {option.count !== undefined && (
>                     <span className="ml-sm text-xs [text-muted]-foreground">({option.count})</span>
                    )}
                  </div>
```

#### numeric-spacing (6)

- **Line 73:223** - `top-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        ref={ref}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-[top-2] data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
```

- **Line 73:260** - `right-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        ref={ref}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-[right-2] data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
```

- **Line 73:300** - `left-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        ref={ref}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-[left-2] data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
```

- **Line 73:337** - `bottom-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        ref={ref}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-[bottom-2] relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
```

- **Line 103:25** - `pl-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
    <SelectPrimitive.Label
      ref={ref}
>     className={cn("py-xs [pl-8] pr-sm text-sm font-semibold", className)}
      {...props}
    />
```

_... and 1 more violations of this type_

#### numeric-radius (3)

- **Line 24:53** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
      ref={ref}
      className={cn(
>       "flex h-10 w-full items-center justify-between [rounded-md] border border-input bg-background px-sm py-sm text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className,
      )}
```

- **Line 73:398** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
        ref={ref}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden [rounded-md] border bg-popover text-popover-foreground shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
```

- **Line 116:68** - `rounded-sm`
  - Suggestion: Use radius tokens through component token system

```
      ref={ref}
      className={cn(
>       "relative flex w-full cursor-default select-none items-center [rounded-sm] py-xs pl-8 pr-sm text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
```

#### numeric-size (16)

- **Line 24:12** - `h-10`
  - Suggestion: Use size tokens through component token system

```
      ref={ref}
      className={cn(
>       "flex [h-10] w-full items-center justify-between rounded-md border border-input bg-background px-sm py-sm text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className,
      )}
```

- **Line 24:17** - `w-full`
  - Suggestion: Use size tokens through component token system

```
      ref={ref}
      className={cn(
>       "flex h-10 [w-full] items-center justify-between rounded-md border border-input bg-background px-sm py-sm text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className,
      )}
```

- **Line 31:30** - `h-4`
  - Suggestion: Use size tokens through component token system

```
      {children}
      <SelectPrimitive.Icon asChild>
>       <ChevronDown className="[h-4] w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
```

- **Line 31:34** - `w-4`
  - Suggestion: Use size tokens through component token system

```
      {children}
      <SelectPrimitive.Icon asChild>
>       <ChevronDown className="h-4 [w-4] opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
```

- **Line 46:26** - `h-4`
  - Suggestion: Use size tokens through component token system

```
      {...props}
    >
>     <ChevronUp className="[h-4] w-4" />
    </SelectPrimitive.ScrollUpButton>
  ));
```

_... and 11 more violations of this type_

#### typography-size (5)

- **Line 24:110** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      ref={ref}
      className={cn(
>       "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-sm py-sm [text-sm] ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className,
      )}
```

- **Line 103:36** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    <SelectPrimitive.Label
      ref={ref}
>     className={cn("py-xs pl-8 pr-sm [text-sm] font-semibold", className)}
      {...props}
    />
```

- **Line 116:96** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      ref={ref}
      className={cn(
>       "relative flex w-full cursor-default select-none items-center rounded-sm py-xs pl-8 pr-sm [text-sm] outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
```

- **Line 171:26** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className={cn("space-y-sm", className)}>
        {label && (
>         <label className="[text-sm] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
```

- **Line 190:43** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                    <span>{option.label}</span>
                    {option.count !== undefined && (
>                     <span className="ml-sm [text-xs] text-muted-foreground">({option.count})</span>
                    )}
                  </div>
```

### src/components/filters/PriceRangeSlider.tsx

**Violations:** 31

#### tailwind-bg-color (2)

- **Line 220:43** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
              aria-label={maxAriaLabel}
            />
>           <div className="h-2 rounded-full [bg-muted]">
              <div
                className="h-2 rounded-full bg-primary"
```

- **Line 222:42** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            <div className="h-2 rounded-full bg-muted">
              <div
>               className="h-2 rounded-full [bg-primary]"
                style={{
                  left: `${((minSliderValue - min) / (max - min)) * 100}%`,
```

#### tailwind-text-color (8)

- **Line 147:59** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div className="flex items-center space-x-sm">
            <div className="flex-1">
>             <Label htmlFor={minPriceId} className="text-xs [text-muted]-foreground">
                {minLabel}
              </Label>
```

- **Line 151:80** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              </Label>
              <div className="relative">
>               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm [text-muted]-foreground">
                  {currency}
                </span>
```

- **Line 169:59** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            </div>
            <div className="flex-1">
>             <Label htmlFor={maxPriceId} className="text-xs [text-muted]-foreground">
                {maxLabel}
              </Label>
```

- **Line 173:80** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              </Label>
              <div className="relative">
>               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm [text-muted]-foreground">
                  {currency}
                </span>
```

- **Line 230:53** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            </div>
          </div>
>         <div className="flex justify-between text-xs [text-muted]-foreground">
            <span>
              {currency}
```

_... and 3 more violations of this type_

#### numeric-spacing (6)

- **Line 151:40** - `left-3`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              </Label>
              <div className="relative">
>               <span className="absolute [left-3] top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {currency}
                </span>
```

- **Line 151:47** - `top-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              </Label>
              <div className="relative">
>               <span className="absolute left-3 [top-1]/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {currency}
                </span>
```

- **Line 164:27** - `pl-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
                  max={max}
                  step={step}
>                 className="[pl-8]"
                />
              </div>
```

- **Line 173:40** - `left-3`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              </Label>
              <div className="relative">
>               <span className="absolute [left-3] top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {currency}
                </span>
```

- **Line 173:47** - `top-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              </Label>
              <div className="relative">
>               <span className="absolute left-3 [top-1]/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {currency}
                </span>
```

_... and 1 more violations of this type_

#### numeric-radius (2)

- **Line 220:30** - `rounded-full`
  - Suggestion: Use radius tokens through component token system

```
              aria-label={maxAriaLabel}
            />
>           <div className="h-2 [rounded-full] bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
```

- **Line 222:29** - `rounded-full`
  - Suggestion: Use radius tokens through component token system

```
            <div className="h-2 rounded-full bg-muted">
              <div
>               className="h-2 [rounded-full] bg-primary"
                style={{
                  left: `${((minSliderValue - min) / (max - min)) * 100}%`,
```

#### numeric-size (6)

- **Line 205:45** - `h-2`
  - Suggestion: Use size tokens through component token system

```
              value={minSliderValue}
              onChange={(e) => handleSliderChange("min", parseInt(e.target.value))}
>             className="slider-thumb absolute [h-2] w-full cursor-pointer appearance-none bg-transparent"
              aria-label={minAriaLabel}
            />
```

- **Line 205:49** - `w-full`
  - Suggestion: Use size tokens through component token system

```
              value={minSliderValue}
              onChange={(e) => handleSliderChange("min", parseInt(e.target.value))}
>             className="slider-thumb absolute h-2 [w-full] cursor-pointer appearance-none bg-transparent"
              aria-label={minAriaLabel}
            />
```

- **Line 217:45** - `h-2`
  - Suggestion: Use size tokens through component token system

```
              value={maxSliderValue}
              onChange={(e) => handleSliderChange("max", parseInt(e.target.value))}
>             className="slider-thumb absolute [h-2] w-full cursor-pointer appearance-none bg-transparent"
              aria-label={maxAriaLabel}
            />
```

- **Line 217:49** - `w-full`
  - Suggestion: Use size tokens through component token system

```
              value={maxSliderValue}
              onChange={(e) => handleSliderChange("max", parseInt(e.target.value))}
>             className="slider-thumb absolute h-2 [w-full] cursor-pointer appearance-none bg-transparent"
              aria-label={maxAriaLabel}
            />
```

- **Line 220:26** - `h-2`
  - Suggestion: Use size tokens through component token system

```
              aria-label={maxAriaLabel}
            />
>           <div className="[h-2] rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
```

_... and 1 more violations of this type_

#### typography-size (7)

- **Line 147:51** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <div className="flex items-center space-x-sm">
            <div className="flex-1">
>             <Label htmlFor={minPriceId} className="[text-xs] text-muted-foreground">
                {minLabel}
              </Label>
```

- **Line 151:72** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              </Label>
              <div className="relative">
>               <span className="absolute left-3 top-1/2 -translate-y-1/2 [text-sm] text-muted-foreground">
                  {currency}
                </span>
```

- **Line 169:51** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            </div>
            <div className="flex-1">
>             <Label htmlFor={maxPriceId} className="[text-xs] text-muted-foreground">
                {maxLabel}
              </Label>
```

- **Line 173:72** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              </Label>
              <div className="relative">
>               <span className="absolute left-3 top-1/2 -translate-y-1/2 [text-sm] text-muted-foreground">
                  {currency}
                </span>
```

- **Line 230:45** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            </div>
          </div>
>         <div className="flex justify-between [text-xs] text-muted-foreground">
            <span>
              {currency}
```

_... and 2 more violations of this type_

### src/components/filters/SearchFilters.tsx

**Violations:** 6

#### tailwind-bg-color (1)

- **Line 108:35** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```

    return (
>     <div className={cn("rounded-lg [bg-background] p-lg shadow-lg", className)}>
        <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-4">
          <div>
```

#### numeric-radius (1)

- **Line 108:24** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```

    return (
>     <div className={cn("[rounded-lg] bg-background p-lg shadow-lg", className)}>
        <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-4">
          <div>
```

#### typography-size (4)

- **Line 111:40** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-4">
          <div>
>           <label className="mb-sm block [text-sm] font-medium">{searchLabel}</label>
            <SearchInput
              placeholder={searchPlaceholder}
```

- **Line 120:40** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

          <div>
>           <label className="mb-sm block [text-sm] font-medium">{dateLabel}</label>
            <DateRangePicker
              value={dateValue}
```

- **Line 132:40** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

          <div>
>           <label className="mb-sm block [text-sm] font-medium">{genreLabel}</label>
            <FilterSelect
              placeholder={genrePlaceholder}
```

- **Line 142:40** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

          <div>
>           <label className="mb-sm block [text-sm] font-medium">{venueLabel}</label>
            <FilterSelect
              placeholder={venuePlaceholder}
```

### src/components/filters/SearchInput.tsx

**Violations:** 13

#### tailwind-text-color (1)

- **Line 67:68** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      <div className={cn("relative", className)}>
        <Search
>         className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 [text-muted]-foreground"
          aria-hidden="true"
        />
```

#### numeric-spacing (6)

- **Line 67:28** - `left-3`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      <div className={cn("relative", className)}>
        <Search
>         className="absolute [left-3] top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
```

- **Line 67:35** - `top-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      <div className={cn("relative", className)}>
        <Search
>         className="absolute left-3 [top-1]/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
```

- **Line 76:19** - `pl-10`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          onChange={handleInputChange}
          placeholder={placeholder}
>         className="[pl-10] pr-10"
          // Filter out props that don't exist in InputProps
          {...(Object.fromEntries(
```

- **Line 76:25** - `pr-10`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          onChange={handleInputChange}
          placeholder={placeholder}
>         className="pl-10 [pr-10]"
          // Filter out props that don't exist in InputProps
          {...(Object.fromEntries(
```

- **Line 87:30** - `right-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            variant="ghost"
            size="icon"
>           className="absolute [right-1] top-1/2 h-6 w-6 -translate-y-1/2"
            onClick={handleClear}
            aria-label="Clear search"
```

_... and 1 more violations of this type_

#### numeric-size (6)

- **Line 67:43** - `h-4`
  - Suggestion: Use size tokens through component token system

```
      <div className={cn("relative", className)}>
        <Search
>         className="absolute left-3 top-1/2 [h-4] w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
```

- **Line 67:47** - `w-4`
  - Suggestion: Use size tokens through component token system

```
      <div className={cn("relative", className)}>
        <Search
>         className="absolute left-3 top-1/2 h-4 [w-4] -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
```

- **Line 87:46** - `h-6`
  - Suggestion: Use size tokens through component token system

```
            variant="ghost"
            size="icon"
>           className="absolute right-1 top-1/2 [h-6] w-6 -translate-y-1/2"
            onClick={handleClear}
            aria-label="Clear search"
```

- **Line 87:50** - `w-6`
  - Suggestion: Use size tokens through component token system

```
            variant="ghost"
            size="icon"
>           className="absolute right-1 top-1/2 h-6 [w-6] -translate-y-1/2"
            onClick={handleClear}
            aria-label="Clear search"
```

- **Line 91:24** - `h-3`
  - Suggestion: Use size tokens through component token system

```
            aria-label="Clear search"
          >
>           <X className="[h-3] w-3" aria-hidden="true" />
          </Button>
        )}
```

_... and 1 more violations of this type_

## Icons Components

**Total:** 60 violations

### src/components/icon/Icon.stories.tsx

**Violations:** 29

#### tailwind-text-color (9)

- **Line 95:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-xs">
          <Icon name="search" size="sm" />
>         <span className="text-xs [text-muted]-foreground">sm</span>
        </div>
        <div className="flex flex-col items-center gap-xs">
```

- **Line 99:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-xs">
          <Icon name="search" size="md" />
>         <span className="text-xs [text-muted]-foreground">md</span>
        </div>
        <div className="flex flex-col items-center gap-xs">
```

- **Line 103:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-xs">
          <Icon name="search" size="lg" />
>         <span className="text-xs [text-muted]-foreground">lg</span>
        </div>
        <div className="flex flex-col items-center gap-xs">
```

- **Line 107:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-xs">
          <Icon name="search" size="xl" />
>         <span className="text-xs [text-muted]-foreground">xl</span>
        </div>
      </div>
```

- **Line 149:33** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="flex flex-col items-center gap-xs">
          <Icon name="check" stroke="thin" size="lg" />
>         <span className="text-xs [text-muted]-foreground">thin</span>
        </div>
        <div className="flex flex-col items-center gap-xs">
```

_... and 4 more violations of this type_

#### numeric-spacing (2)

- **Line 189:38** - `top-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            name="search"
            size="sm"
>           className="absolute left-sm [top-1]/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input className="pl-8" placeholder="Search..." />
```

- **Line 191:26** - `pl-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            className="absolute left-sm top-1/2 -translate-y-1/2 text-muted-foreground"
          />
>         <Input className="[pl-8]" placeholder="Search..." />
        </div>
      </div>
```

#### typography-size (18)

- **Line 95:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-xs">
          <Icon name="search" size="sm" />
>         <span className="[text-xs] text-muted-foreground">sm</span>
        </div>
        <div className="flex flex-col items-center gap-xs">
```

- **Line 99:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-xs">
          <Icon name="search" size="md" />
>         <span className="[text-xs] text-muted-foreground">md</span>
        </div>
        <div className="flex flex-col items-center gap-xs">
```

- **Line 103:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-xs">
          <Icon name="search" size="lg" />
>         <span className="[text-xs] text-muted-foreground">lg</span>
        </div>
        <div className="flex flex-col items-center gap-xs">
```

- **Line 107:25** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex flex-col items-center gap-xs">
          <Icon name="search" size="xl" />
>         <span className="[text-xs] text-muted-foreground">xl</span>
        </div>
      </div>
```

- **Line 118:25** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex items-center gap-md">
          <Icon name="info" color="default" />
>         <span className="[text-sm]">default</span>
        </div>
        <div className="flex items-center gap-md">
```

_... and 13 more violations of this type_

### src/components/icon/IconGallery.stories.tsx

**Violations:** 25

#### tailwind-text-color (11)

- **Line 42:35** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div key={name} className="flex flex-col items-center gap-xs rounded-md border p-md">
            <Icon name={name} size="xl" />
>           <span className="text-xs [text-muted]-foreground">{name}</span>
          </div>
        ))}
```

- **Line 58:39** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <div className="flex flex-col items-center gap-xs">
                <Icon name={name} size="sm" />
>               <span className="text-xs [text-muted]-foreground">sm</span>
              </div>
              <div className="flex flex-col items-center gap-xs">
```

- **Line 62:39** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <div className="flex flex-col items-center gap-xs">
                <Icon name={name} size="md" />
>               <span className="text-xs [text-muted]-foreground">md</span>
              </div>
              <div className="flex flex-col items-center gap-xs">
```

- **Line 66:39** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <div className="flex flex-col items-center gap-xs">
                <Icon name={name} size="lg" />
>               <span className="text-xs [text-muted]-foreground">lg</span>
              </div>
              <div className="flex flex-col items-center gap-xs">
```

- **Line 70:39** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <div className="flex flex-col items-center gap-xs">
                <Icon name={name} size="xl" />
>               <span className="text-xs [text-muted]-foreground">xl</span>
              </div>
            </div>
```

_... and 6 more violations of this type_

#### numeric-radius (1)

- **Line 40:69** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
      <div className="grid grid-cols-2 gap-md sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {iconNames.map((name) => (
>         <div key={name} className="flex flex-col items-center gap-xs [rounded-md] border p-md">
            <Icon name={name} size="xl" />
            <span className="text-xs text-muted-foreground">{name}</span>
```

#### typography-size (13)

- **Line 42:27** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <div key={name} className="flex flex-col items-center gap-xs rounded-md border p-md">
            <Icon name={name} size="xl" />
>           <span className="[text-xs] text-muted-foreground">{name}</span>
          </div>
        ))}
```

- **Line 54:25** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        {iconNames.map((name) => (
          <div key={name} className="space-y-xs">
>           <h3 className="[text-sm] font-semibold capitalize">{name}</h3>
            <div className="flex items-center gap-md">
              <div className="flex flex-col items-center gap-xs">
```

- **Line 58:31** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              <div className="flex flex-col items-center gap-xs">
                <Icon name={name} size="sm" />
>               <span className="[text-xs] text-muted-foreground">sm</span>
              </div>
              <div className="flex flex-col items-center gap-xs">
```

- **Line 62:31** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              <div className="flex flex-col items-center gap-xs">
                <Icon name={name} size="md" />
>               <span className="[text-xs] text-muted-foreground">md</span>
              </div>
              <div className="flex flex-col items-center gap-xs">
```

- **Line 66:31** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              <div className="flex flex-col items-center gap-xs">
                <Icon name={name} size="lg" />
>               <span className="[text-xs] text-muted-foreground">lg</span>
              </div>
              <div className="flex flex-col items-center gap-xs">
```

_... and 8 more violations of this type_

### src/components/icons/TrendingIcon.tsx

**Violations:** 6

#### tailwind-bg-color (1)

- **Line 14:75** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
    return (
      <div
>       className={cn("flex h-6 w-6 items-center justify-center rounded-full [bg-primary]", className)}
      >
        <span className="text-sm text-white">↑</span>
```

#### tailwind-text-color (1)

- **Line 16:31** - `text-white`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        className={cn("flex h-6 w-6 items-center justify-center rounded-full bg-primary", className)}
      >
>       <span className="text-sm [text-white]">↑</span>
      </div>
    );
```

#### numeric-radius (1)

- **Line 14:62** - `rounded-full`
  - Suggestion: Use radius tokens through component token system

```
    return (
      <div
>       className={cn("flex h-6 w-6 items-center justify-center [rounded-full] bg-primary", className)}
      >
        <span className="text-sm text-white">↑</span>
```

#### numeric-size (2)

- **Line 14:26** - `h-6`
  - Suggestion: Use size tokens through component token system

```
    return (
      <div
>       className={cn("flex [h-6] w-6 items-center justify-center rounded-full bg-primary", className)}
      >
        <span className="text-sm text-white">↑</span>
```

- **Line 14:30** - `w-6`
  - Suggestion: Use size tokens through component token system

```
    return (
      <div
>       className={cn("flex h-6 [w-6] items-center justify-center rounded-full bg-primary", className)}
      >
        <span className="text-sm text-white">↑</span>
```

#### typography-size (1)

- **Line 16:23** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        className={cn("flex h-6 w-6 items-center justify-center rounded-full bg-primary", className)}
      >
>       <span className="[text-sm] text-white">↑</span>
      </div>
    );
```

## Layout Components

**Total:** 323 violations

### src/components/layout/Container.tsx

**Violations:** 2

#### numeric-spacing (1)

- **Line 24:13** - `px-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      },
      padding: {
>       none: "[px-0]",
        sm: "px-sm",
        md: "px-md",
```

#### numeric-size (1)

- **Line 21:13** - `max-w-full`
  - Suggestion: Use size tokens through component token system

```
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
>       full: "[max-w-full]",
      },
      padding: {
```

### src/components/layout/Flex.stories.tsx

**Violations:** 115

#### tailwind-bg-color (47)

- **Line 52:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      children: (
        <>
>         <div className="rounded-md border [bg-card] p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
```

- **Line 53:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        <>
          <div className="rounded-md border bg-card p-md">Item 1</div>
>         <div className="rounded-md border [bg-card] p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </>
```

- **Line 54:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
>         <div className="rounded-md border [bg-card] p-md">Item 3</div>
        </>
      ),
```

- **Line 65:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      children: (
        <>
>         <div className="rounded-md border [bg-card] p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
```

- **Line 66:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        <>
          <div className="rounded-md border bg-card p-md">Item 1</div>
>         <div className="rounded-md border [bg-card] p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </>
```

_... and 42 more violations of this type_

#### numeric-radius (47)

- **Line 52:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
      children: (
        <>
>         <div className="[rounded-md] border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
```

- **Line 53:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
        <>
          <div className="rounded-md border bg-card p-md">Item 1</div>
>         <div className="[rounded-md] border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </>
```

- **Line 54:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
>         <div className="[rounded-md] border bg-card p-md">Item 3</div>
        </>
      ),
```

- **Line 65:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
      children: (
        <>
>         <div className="[rounded-md] border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
```

- **Line 66:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
        <>
          <div className="rounded-md border bg-card p-md">Item 1</div>
>         <div className="[rounded-md] border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </>
```

_... and 42 more violations of this type_

#### numeric-size (6)

- **Line 137:47** - `h-32`
  - Suggestion: Use size tokens through component token system

```
        <div>
          <h3 className="mb-sm text-lg font-semibold">Start</h3>
>         <Flex align="start" gap={4} className="[h-32]">
            <div className="rounded-md border bg-card p-md">Item 1</div>
            <div className="h-20 rounded-md border bg-card p-md">Tall Item</div>
```

- **Line 139:26** - `h-20`
  - Suggestion: Use size tokens through component token system

```
          <Flex align="start" gap={4} className="h-32">
            <div className="rounded-md border bg-card p-md">Item 1</div>
>           <div className="[h-20] rounded-md border bg-card p-md">Tall Item</div>
            <div className="rounded-md border bg-card p-md">Item 3</div>
          </Flex>
```

- **Line 145:48** - `h-32`
  - Suggestion: Use size tokens through component token system

```
        <div>
          <h3 className="mb-sm text-lg font-semibold">Center</h3>
>         <Flex align="center" gap={4} className="[h-32]">
            <div className="rounded-md border bg-card p-md">Item 1</div>
            <div className="h-20 rounded-md border bg-card p-md">Tall Item</div>
```

- **Line 147:26** - `h-20`
  - Suggestion: Use size tokens through component token system

```
          <Flex align="center" gap={4} className="h-32">
            <div className="rounded-md border bg-card p-md">Item 1</div>
>           <div className="[h-20] rounded-md border bg-card p-md">Tall Item</div>
            <div className="rounded-md border bg-card p-md">Item 3</div>
          </Flex>
```

- **Line 153:49** - `h-32`
  - Suggestion: Use size tokens through component token system

```
        <div>
          <h3 className="mb-sm text-lg font-semibold">Stretch</h3>
>         <Flex align="stretch" gap={4} className="[h-32]">
            <div className="rounded-md border bg-card p-md">Item 1</div>
            <div className="h-20 rounded-md border bg-card p-md">Tall Item</div>
```

_... and 1 more violations of this type_

#### typography-size (15)

- **Line 77:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className="space-y-lg">
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Row (default)</h3>
          <Flex direction="row" gap={4}>
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

- **Line 85:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Column</h3>
          <Flex direction="column" gap={4}>
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

- **Line 100:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className="space-y-lg">
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Start</h3>
          <Flex justify="start" gap={4}>
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

- **Line 107:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Center</h3>
          <Flex justify="center" gap={4}>
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

- **Line 114:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Between</h3>
          <Flex justify="between" gap={4}>
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

_... and 10 more violations of this type_

### src/components/layout/Footer.tsx

**Violations:** 3

#### tailwind-bg-color (1)

- **Line 16:43** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
  export const Footer: React.FC<FooterProps> = ({ className, left, right, children }) => {
    return (
>     <footer className={cn("w-full border-t [bg-background] px-md py-lg", className)}>
        <div className="flex w-full items-center justify-between">
          {left && <div className="flex items-center">{left}</div>}
```

#### numeric-size (2)

- **Line 16:27** - `w-full`
  - Suggestion: Use size tokens through component token system

```
  export const Footer: React.FC<FooterProps> = ({ className, left, right, children }) => {
    return (
>     <footer className={cn("[w-full] border-t bg-background px-md py-lg", className)}>
        <div className="flex w-full items-center justify-between">
          {left && <div className="flex items-center">{left}</div>}
```

- **Line 17:27** - `w-full`
  - Suggestion: Use size tokens through component token system

```
    return (
      <footer className={cn("w-full border-t bg-background px-md py-lg", className)}>
>       <div className="flex [w-full] items-center justify-between">
          {left && <div className="flex items-center">{left}</div>}

```

### src/components/layout/Grid.stories.tsx

**Violations:** 98

#### tailwind-bg-color (42)

- **Line 67:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      children: (
        <>
>         <div className="rounded-md border [bg-card] p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
```

- **Line 68:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        <>
          <div className="rounded-md border bg-card p-md">Item 1</div>
>         <div className="rounded-md border [bg-card] p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
          <div className="rounded-md border bg-card p-md">Item 4</div>
```

- **Line 69:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
>         <div className="rounded-md border [bg-card] p-md">Item 3</div>
          <div className="rounded-md border bg-card p-md">Item 4</div>
          <div className="rounded-md border bg-card p-md">Item 5</div>
```

- **Line 70:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
>         <div className="rounded-md border [bg-card] p-md">Item 4</div>
          <div className="rounded-md border bg-card p-md">Item 5</div>
          <div className="rounded-md border bg-card p-md">Item 6</div>
```

- **Line 71:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <div className="rounded-md border bg-card p-md">Item 3</div>
          <div className="rounded-md border bg-card p-md">Item 4</div>
>         <div className="rounded-md border [bg-card] p-md">Item 5</div>
          <div className="rounded-md border bg-card p-md">Item 6</div>
        </>
```

_... and 37 more violations of this type_

#### tailwind-text-color (1)

- **Line 320:24** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div className="col-span-full rounded-md border bg-card p-lg">
            <h2 className="text-2xl font-bold">Featured Section</h2>
>           <p className="[text-muted]-foreground">This spans all columns</p>
          </div>
          <div className="rounded-md border bg-card p-md">Card 1</div>
```

#### numeric-radius (42)

- **Line 67:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
      children: (
        <>
>         <div className="[rounded-md] border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
```

- **Line 68:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
        <>
          <div className="rounded-md border bg-card p-md">Item 1</div>
>         <div className="[rounded-md] border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
          <div className="rounded-md border bg-card p-md">Item 4</div>
```

- **Line 69:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
>         <div className="[rounded-md] border bg-card p-md">Item 3</div>
          <div className="rounded-md border bg-card p-md">Item 4</div>
          <div className="rounded-md border bg-card p-md">Item 5</div>
```

- **Line 70:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
>         <div className="[rounded-md] border bg-card p-md">Item 4</div>
          <div className="rounded-md border bg-card p-md">Item 5</div>
          <div className="rounded-md border bg-card p-md">Item 6</div>
```

- **Line 71:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
          <div className="rounded-md border bg-card p-md">Item 3</div>
          <div className="rounded-md border bg-card p-md">Item 4</div>
>         <div className="[rounded-md] border bg-card p-md">Item 5</div>
          <div className="rounded-md border bg-card p-md">Item 6</div>
        </>
```

_... and 37 more violations of this type_

#### numeric-size (4)

- **Line 160:56** - `h-32`
  - Suggestion: Use size tokens through component token system

```
        <div>
          <h3 className="mb-sm text-lg font-semibold">Align: Start</h3>
>         <Grid cols={3} gap={4} align="start" className="[h-32]">
            <div className="rounded-md border bg-card p-md">Item 1</div>
            <div className="h-20 rounded-md border bg-card p-md">Tall Item</div>
```

- **Line 162:26** - `h-20`
  - Suggestion: Use size tokens through component token system

```
          <Grid cols={3} gap={4} align="start" className="h-32">
            <div className="rounded-md border bg-card p-md">Item 1</div>
>           <div className="[h-20] rounded-md border bg-card p-md">Tall Item</div>
            <div className="rounded-md border bg-card p-md">Item 3</div>
          </Grid>
```

- **Line 168:57** - `h-32`
  - Suggestion: Use size tokens through component token system

```
        <div>
          <h3 className="mb-sm text-lg font-semibold">Align: Center</h3>
>         <Grid cols={3} gap={4} align="center" className="[h-32]">
            <div className="rounded-md border bg-card p-md">Item 1</div>
            <div className="h-20 rounded-md border bg-card p-md">Tall Item</div>
```

- **Line 170:26** - `h-20`
  - Suggestion: Use size tokens through component token system

```
          <Grid cols={3} gap={4} align="center" className="h-32">
            <div className="rounded-md border bg-card p-md">Item 1</div>
>           <div className="[h-20] rounded-md border bg-card p-md">Tall Item</div>
            <div className="rounded-md border bg-card p-md">Item 3</div>
          </Grid>
```

#### typography-size (9)

- **Line 112:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className="space-y-lg">
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Gap: xs (1) - uses CSS variables</h3>
          <Grid cols={3} gap={1}>
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

- **Line 120:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Gap: md (4) - uses CSS variables</h3>
          <Grid cols={3} gap={4}>
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

- **Line 128:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Gap: xl (8) - uses CSS variables</h3>
          <Grid cols={3} gap={8}>
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

- **Line 136:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Gap: semantic lg - uses CSS variables</h3>
          <Grid cols={3} gap="lg">
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

- **Line 159:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className="space-y-lg">
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Align: Start</h3>
          <Grid cols={3} gap={4} align="start" className="h-32">
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

_... and 4 more violations of this type_

### src/components/layout/ModeHero.tsx

**Violations:** 12

#### tailwind-bg-color (2)

- **Line 53:43** - `bg-white`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          </Text>
          <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
>           <Card className="border-white/20 [bg-white]/10 backdrop-blur-sm">
              <CardContent className="p-lg">
                <Heading level={3} className="mb-sm text-2xl font-semibold">
```

- **Line 61:43** - `bg-white`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
              </CardContent>
            </Card>
>           <Card className="border-white/20 [bg-white]/10 backdrop-blur-sm">
              <CardContent className="p-lg">
                <Heading level={3} className="mb-sm text-2xl font-semibold">
```

#### tailwind-text-color (3)

- **Line 41:65** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      <div
        className={cn(
>         "rounded-lg bg-gradient-to-r from-primary to-accent p-lg [text-primary]-foreground",
          className,
        )}
```

- **Line 58:31** - `text-white`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                  {dayLabel}
                </Heading>
>               <Text className="[text-white]/80">{dayDescription}</Text>
              </CardContent>
            </Card>
```

- **Line 66:31** - `text-white`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                  {nightLabel}
                </Heading>
>               <Text className="[text-white]/80">{nightDescription}</Text>
              </CardContent>
            </Card>
```

#### tailwind-border-color (2)

- **Line 53:27** - `border-white`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
          </Text>
          <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
>           <Card className="[border-white]/20 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-lg">
                <Heading level={3} className="mb-sm text-2xl font-semibold">
```

- **Line 61:27** - `border-white`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
              </CardContent>
            </Card>
>           <Card className="[border-white]/20 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-lg">
                <Heading level={3} className="mb-sm text-2xl font-semibold">
```

#### numeric-spacing (1)

- **Line 49:35** - `mb-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            Tenerife Music Platform
          </Heading>
>         <Text size="xl" className="[mb-8]">
            Discover amazing music events in Tenerife
          </Text>
```

#### numeric-radius (1)

- **Line 41:9** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
      <div
        className={cn(
>         "[rounded-lg] bg-gradient-to-r from-primary to-accent p-lg text-primary-foreground",
          className,
        )}
```

#### typography-size (3)

- **Line 46:44** - `text-4xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      >
        <div className="mx-auto max-w-4xl text-center">
>         <Heading level={1} className="mb-md [text-4xl] font-bold">
            Tenerife Music Platform
          </Heading>
```

- **Line 55:50** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-lg">
>               <Heading level={3} className="mb-sm [text-2xl] font-semibold">
                  {dayLabel}
                </Heading>
```

- **Line 63:50** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-lg">
>               <Heading level={3} className="mb-sm [text-2xl] font-semibold">
                  {nightLabel}
                </Heading>
```

### src/components/layout/Navbar.tsx

**Violations:** 1

#### numeric-size (1)

- **Line 24:26** - `w-full`
  - Suggestion: Use size tokens through component token system

```
    return (
      <nav
>       className={cn("flex [w-full] items-center justify-between px-md py-sm", className)}
        aria-label={ariaLabel}
        {...rest}
```

### src/components/layout/Section.tsx

**Violations:** 3

#### tailwind-bg-color (2)

- **Line 32:12** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
    const backgroundClasses = {
      default: "",
>     muted: "[bg-muted]",
      card: "bg-card",
    };
```

- **Line 33:11** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      default: "",
      muted: "bg-muted",
>     card: "[bg-card]",
    };

```

#### numeric-size (1)

- **Line 38:21** - `w-full`
  - Suggestion: Use size tokens through component token system

```
    return (
      <Component
>       className={cn("[w-full]", paddingClasses[padding], backgroundClasses[background], className)}
      >
        {children}
```

### src/components/layout/Stack.stories.tsx

**Violations:** 86

#### tailwind-bg-color (38)

- **Line 42:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      children: (
        <>
>         <div className="rounded-md border [bg-card] p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
```

- **Line 43:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        <>
          <div className="rounded-md border bg-card p-md">Item 1</div>
>         <div className="rounded-md border [bg-card] p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </>
```

- **Line 44:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
>         <div className="rounded-md border [bg-card] p-md">Item 3</div>
        </>
      ),
```

- **Line 55:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      children: (
        <>
>         <div className="rounded-md border [bg-card] p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
```

- **Line 56:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        <>
          <div className="rounded-md border bg-card p-md">Item 1</div>
>         <div className="rounded-md border [bg-card] p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </>
```

_... and 33 more violations of this type_

#### numeric-radius (38)

- **Line 42:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
      children: (
        <>
>         <div className="[rounded-md] border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
```

- **Line 43:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
        <>
          <div className="rounded-md border bg-card p-md">Item 1</div>
>         <div className="[rounded-md] border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </>
```

- **Line 44:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
>         <div className="[rounded-md] border bg-card p-md">Item 3</div>
        </>
      ),
```

- **Line 55:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
      children: (
        <>
>         <div className="[rounded-md] border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
```

- **Line 56:24** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
        <>
          <div className="rounded-md border bg-card p-md">Item 1</div>
>         <div className="[rounded-md] border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </>
```

_... and 33 more violations of this type_

#### numeric-size (1)

- **Line 143:52** - `h-32`
  - Suggestion: Use size tokens through component token system

```
        <div>
          <h3 className="mb-sm text-lg font-semibold">Justify: Between</h3>
>         <Stack justify="between" gap={4} className="[h-32]">
            <div className="rounded-md border bg-card p-md">Item 1</div>
            <div className="rounded-md border bg-card p-md">Item 2</div>
```

#### typography-size (9)

- **Line 80:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className="space-y-lg">
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Spacing: xs (1)</h3>
          <Stack gap={1}>
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

- **Line 88:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Spacing: md (4)</h3>
          <Stack gap={4}>
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

- **Line 96:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Spacing: xl (8)</h3>
          <Stack gap={8}>
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

- **Line 104:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Spacing: semantic lg</h3>
          <Stack gap="lg">
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

- **Line 126:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className="space-y-lg">
        <div>
>         <h3 className="mb-sm [text-lg] font-semibold">Align: Start</h3>
          <Stack align="start" gap={4}>
            <div className="rounded-md border bg-card p-md">Item 1</div>
```

_... and 4 more violations of this type_

### src/components/layout/Surface.tsx

**Violations:** 3

#### tailwind-bg-color (3)

- **Line 21:13** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
    variants: {
      variant: {
>       flat: "[bg-background] border border-border shadow-none",
        raised: "bg-card border border-border shadow-sm",
        sunken: "bg-muted border border-border shadow-none",
```

- **Line 22:15** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      variant: {
        flat: "bg-background border border-border shadow-none",
>       raised: "[bg-card] border border-border shadow-sm",
        sunken: "bg-muted border border-border shadow-none",
      },
```

- **Line 23:15** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        flat: "bg-background border border-border shadow-none",
        raised: "bg-card border border-border shadow-sm",
>       sunken: "[bg-muted] border border-border shadow-none",
      },
    },
```

## Stories Components

**Total:** 512 violations

### src/components/SectionBuilder.stories.tsx

**Violations:** 52

#### tailwind-bg-color (6)

- **Line 321:75** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            role: "Frontend Lead",
            avatar: (
>             <div className="flex h-full w-full items-center justify-center [bg-primary]/20 font-bold text-primary">
                SJ
              </div>
```

- **Line 333:75** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            role: "UI Designer",
            avatar: (
>             <div className="flex h-full w-full items-center justify-center [bg-accent]/20 font-bold text-accent">
                MC
              </div>
```

- **Line 345:75** - `bg-secondary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            role: "Full Stack Developer",
            avatar: (
>             <div className="flex h-full w-full items-center justify-center [bg-secondary]/20 font-bold text-secondary-foreground">
                ER
              </div>
```

- **Line 457:44** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
              Before: Manual Markup
            </Heading>
>           <div className="rounded-lg border [bg-muted] p-4 font-mono text-sm">
              <pre>{`<section className="py-xl px-lg bg-card">
    <div className="container mx-auto">
```

- **Line 458:51** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            </Heading>
            <div className="rounded-lg border bg-muted p-4 font-mono text-sm">
>             <pre>{`<section className="py-xl px-lg [bg-card]">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
```

_... and 1 more violations of this type_

#### tailwind-text-color (3)

- **Line 321:99** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            role: "Frontend Lead",
            avatar: (
>             <div className="flex h-full w-full items-center justify-center bg-primary/20 font-bold [text-primary]">
                SJ
              </div>
```

- **Line 333:98** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            role: "UI Designer",
            avatar: (
>             <div className="flex h-full w-full items-center justify-center bg-accent/20 font-bold [text-accent]">
                MC
              </div>
```

- **Line 345:101** - `text-secondary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            role: "Full Stack Developer",
            avatar: (
>             <div className="flex h-full w-full items-center justify-center bg-secondary/20 font-bold [text-secondary]-foreground">
                ER
              </div>
```

#### numeric-spacing (8)

- **Line 452:22** - `space-y-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
    render: () => {
      return (
>       <div className="[space-y-8] p-8">
          <div>
            <Heading level={2} className="mb-4">
```

- **Line 452:32** - `p-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
    render: () => {
      return (
>       <div className="space-y-8 [p-8]">
          <div>
            <Heading level={2} className="mb-4">
```

- **Line 454:40** - `mb-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        <div className="space-y-8 p-8">
          <div>
>           <Heading level={2} className="[mb-4]">
              Before: Manual Markup
            </Heading>
```

- **Line 457:53** - `p-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              Before: Manual Markup
            </Heading>
>           <div className="rounded-lg border bg-muted [p-4] font-mono text-sm">
              <pre>{`<section className="py-xl px-lg bg-card">
    <div className="container mx-auto">
```

- **Line 475:40** - `mb-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```

          <div>
>           <Heading level={2} className="[mb-4]">
              After: SectionBuilder
            </Heading>
```

_... and 3 more violations of this type_

#### numeric-radius (5)

- **Line 147:71** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
          type: "media",
          content: (
>           <div className="flex h-64 w-full items-center justify-center [rounded-lg] bg-gradient-to-br from-primary/20 to-accent/20">
              <Text className="text-4xl">🎨</Text>
            </div>
```

- **Line 194:71** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
          type: "media",
          content: (
>           <div className="flex h-48 w-full items-center justify-center [rounded-lg] bg-gradient-to-br from-secondary/20 to-primary/20">
              <Text className="text-3xl">📱</Text>
            </div>
```

- **Line 457:26** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
              Before: Manual Markup
            </Heading>
>           <div className="[rounded-lg] border bg-muted p-4 font-mono text-sm">
              <pre>{`<section className="py-xl px-lg bg-card">
    <div className="container mx-auto">
```

- **Line 478:26** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
              After: SectionBuilder
            </Heading>
>           <div className="[rounded-lg] border bg-muted p-4 font-mono text-sm">
              <pre>{`<SectionBuilder
    config={createSplitLayoutConfig({
```

- **Line 508:79** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
                  type: "media",
                  content: (
>                   <div className="flex h-48 w-full items-center justify-center [rounded-lg] bg-gradient-to-br from-primary/20 to-accent/20">
                      <Text>Image</Text>
                    </div>
```

#### numeric-size (12)

- **Line 147:31** - `h-64`
  - Suggestion: Use size tokens through component token system

```
          type: "media",
          content: (
>           <div className="flex [h-64] w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
              <Text className="text-4xl">🎨</Text>
            </div>
```

- **Line 147:36** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          type: "media",
          content: (
>           <div className="flex h-64 [w-full] items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
              <Text className="text-4xl">🎨</Text>
            </div>
```

- **Line 194:31** - `h-48`
  - Suggestion: Use size tokens through component token system

```
          type: "media",
          content: (
>           <div className="flex [h-48] w-full items-center justify-center rounded-lg bg-gradient-to-br from-secondary/20 to-primary/20">
              <Text className="text-3xl">📱</Text>
            </div>
```

- **Line 194:36** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          type: "media",
          content: (
>           <div className="flex h-48 [w-full] items-center justify-center rounded-lg bg-gradient-to-br from-secondary/20 to-primary/20">
              <Text className="text-3xl">📱</Text>
            </div>
```

- **Line 321:33** - `h-full`
  - Suggestion: Use size tokens through component token system

```
            role: "Frontend Lead",
            avatar: (
>             <div className="flex [h-full] w-full items-center justify-center bg-primary/20 font-bold text-primary">
                SJ
              </div>
```

_... and 7 more violations of this type_

#### typography-size (18)

- **Line 148:29** - `text-4xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          content: (
            <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
>             <Text className="[text-4xl]">🎨</Text>
            </div>
          ),
```

- **Line 195:29** - `text-3xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          content: (
            <div className="flex h-48 w-full items-center justify-center rounded-lg bg-gradient-to-br from-secondary/20 to-primary/20">
>             <Text className="[text-3xl]">📱</Text>
            </div>
          ),
```

- **Line 225:33** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        features: [
          {
>           icon: <span className="[text-2xl]">⚡</span>,
            title: "Lightning Fast",
            description: "Built with performance in mind. No unnecessary re-renders.",
```

- **Line 230:33** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          },
          {
>           icon: <span className="[text-2xl]">🎨</span>,
            title: "Fully Themed",
            description: "Responds to light/dark mode and brand themes automatically.",
```

- **Line 235:33** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          },
          {
>           icon: <span className="[text-2xl]">📱</span>,
            title: "Responsive",
            description: "All layouts adapt to different screen sizes seamlessly.",
```

_... and 13 more violations of this type_

### src/components/data/Table.stories.tsx

**Violations:** 7

#### tailwind-bg-color (3)

- **Line 47:19** - `bg-destructive`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
              className={`rounded px-sm py-xs text-xs ${
                value === "Admin"
>                 ? "[bg-destructive]/20 text-destructive-foreground"
                  : value === "Moderator"
                    ? "bg-secondary/20 text-secondary-foreground"
```

- **Line 49:21** - `bg-secondary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                  ? "bg-destructive/20 text-destructive-foreground"
                  : value === "Moderator"
>                   ? "[bg-secondary]/20 text-secondary-foreground"
                    : "bg-accent/20 text-accent-foreground"
              }`}
```

- **Line 50:21** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                  : value === "Moderator"
                    ? "bg-secondary/20 text-secondary-foreground"
>                   : "[bg-accent]/20 text-accent-foreground"
              }`}
            >
```

#### tailwind-text-color (3)

- **Line 47:37** - `text-destructive`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              className={`rounded px-sm py-xs text-xs ${
                value === "Admin"
>                 ? "bg-destructive/20 [text-destructive]-foreground"
                  : value === "Moderator"
                    ? "bg-secondary/20 text-secondary-foreground"
```

- **Line 49:37** - `text-secondary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                  ? "bg-destructive/20 text-destructive-foreground"
                  : value === "Moderator"
>                   ? "bg-secondary/20 [text-secondary]-foreground"
                    : "bg-accent/20 text-accent-foreground"
              }`}
```

- **Line 50:34** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                  : value === "Moderator"
                    ? "bg-secondary/20 text-secondary-foreground"
>                   : "bg-accent/20 [text-accent]-foreground"
              }`}
            >
```

#### typography-size (1)

- **Line 45:44** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          render: (value: unknown) => (
            <span
>             className={`rounded px-sm py-xs [text-xs] ${
                value === "Admin"
                  ? "bg-destructive/20 text-destructive-foreground"
```

### src/components/data/data-list/DataList.stories.tsx

**Violations:** 17

#### tailwind-bg-color (1)

- **Line 136:65** - `bg-green-500`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <DataListLabel>Status</DataListLabel>
          <DataListValue>
>           <span className="inline-flex items-center rounded-full [bg-green-500]/10 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400">
              Active
            </span>
```

#### tailwind-text-color (3)

- **Line 136:111** - `text-green-700`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <DataListLabel>Status</DataListLabel>
          <DataListValue>
>           <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium [text-green-700] dark:text-green-400">
              Active
            </span>
```

- **Line 136:131** - `text-green-400`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <DataListLabel>Status</DataListLabel>
          <DataListValue>
>           <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:[text-green-400]">
              Active
            </span>
```

- **Line 189:28** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
    render: () => (
      <div className="space-y-4">
>       <p className="text-sm [text-muted]-foreground">
          Resize the viewport to see the responsive behavior. On mobile, labels appear above values.
          On desktop (md breakpoint and above), labels appear on the left with fixed width.
```

#### numeric-spacing (7)

- **Line 61:20** - `space-y-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
  export const PaddingSizes: Story = {
    render: () => (
>     <div className="[space-y-8]">
        <div>
          <h3 className="mb-4 text-sm font-semibold">Small Padding</h3>
```

- **Line 63:23** - `mb-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      <div className="space-y-8">
        <div>
>         <h3 className="[mb-4] text-sm font-semibold">Small Padding</h3>
          <DataListRoot>
            <DataListItem padding="sm">
```

- **Line 77:23** - `mb-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```

        <div>
>         <h3 className="[mb-4] text-sm font-semibold">Medium Padding (Default)</h3>
          <DataListRoot>
            <DataListItem padding="md">
```

- **Line 91:23** - `mb-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```

        <div>
>         <h3 className="[mb-4] text-sm font-semibold">Large Padding</h3>
          <DataListRoot>
            <DataListItem padding="lg">
```

- **Line 136:81** - `px-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <DataListLabel>Status</DataListLabel>
          <DataListValue>
>           <span className="inline-flex items-center rounded-full bg-green-500/10 [px-2] py-1 text-xs font-medium text-green-700 dark:text-green-400">
              Active
            </span>
```

_... and 2 more violations of this type_

#### numeric-radius (1)

- **Line 136:52** - `rounded-full`
  - Suggestion: Use radius tokens through component token system

```
          <DataListLabel>Status</DataListLabel>
          <DataListValue>
>           <span className="inline-flex items-center [rounded-full] bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400">
              Active
            </span>
```

#### typography-size (5)

- **Line 63:28** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className="space-y-8">
        <div>
>         <h3 className="mb-4 [text-sm] font-semibold">Small Padding</h3>
          <DataListRoot>
            <DataListItem padding="sm">
```

- **Line 77:28** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

        <div>
>         <h3 className="mb-4 [text-sm] font-semibold">Medium Padding (Default)</h3>
          <DataListRoot>
            <DataListItem padding="md">
```

- **Line 91:28** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

        <div>
>         <h3 className="mb-4 [text-sm] font-semibold">Large Padding</h3>
          <DataListRoot>
            <DataListItem padding="lg">
```

- **Line 136:91** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <DataListLabel>Status</DataListLabel>
          <DataListValue>
>           <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 [text-xs] font-medium text-green-700 dark:text-green-400">
              Active
            </span>
```

- **Line 189:20** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    render: () => (
      <div className="space-y-4">
>       <p className="[text-sm] text-muted-foreground">
          Resize the viewport to see the responsive behavior. On mobile, labels appear above values.
          On desktop (md breakpoint and above), labels appear on the left with fixed width.
```

### src/components/data/empty-state/EmptyState.stories.tsx

**Violations:** 3

#### tailwind-text-color (1)

- **Line 104:21** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            strokeLinecap="round"
            strokeLinejoin="round"
>           className="[text-muted]-foreground"
          >
            <circle cx="12" cy="12" r="10" />
```

#### numeric-spacing (2)

- **Line 65:20** - `space-y-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
  export const IconSizes: Story = {
    render: () => (
>     <div className="[space-y-8]">
        <EmptyState>
          <EmptyStateIcon size="sm">📭</EmptyStateIcon>
```

- **Line 159:29** - `gap-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        <EmptyStateDescription>You don't have any packages yet.</EmptyStateDescription>
        <EmptyStateAction>
>         <div className="flex [gap-2]">
            <Button variant="outline">Import</Button>
            <Button>Create Package</Button>
```

### src/components/data/skeleton/Skeleton.stories.tsx

**Violations:** 32

#### numeric-spacing (16)

- **Line 59:20** - `space-y-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
    },
    render: (args) => (
>     <div className="[space-y-2]">
        <p>
          Loading <Skeleton {...args} className="w-20" /> content
```

- **Line 102:20** - `space-y-6`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
  export const AllVariants: Story = {
    render: () => (
>     <div className="[space-y-6]">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Text Variant</h3>
```

- **Line 103:22** - `space-y-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
    render: () => (
      <div className="space-y-6">
>       <div className="[space-y-2]">
          <h3 className="text-sm font-semibold">Text Variant</h3>
          <Skeleton variant="text" />
```

- **Line 110:22** - `space-y-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        </div>

>       <div className="[space-y-2]">
          <h3 className="text-sm font-semibold">Inline Variant</h3>
          <p>
```

- **Line 117:22** - `space-y-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        </div>

>       <div className="[space-y-2]">
          <h3 className="text-sm font-semibold">Block Variant</h3>
          <Skeleton variant="block" />
```

_... and 11 more violations of this type_

#### numeric-radius (1)

- **Line 144:35** - `rounded-xl`
  - Suggestion: Use radius tokens through component token system

```
  export const CardLoading: Story = {
    render: () => (
>     <div className="w-80 space-y-4 [rounded-xl] border border-border p-6">
        <div className="flex items-center gap-4">
          <Skeleton variant="circle" />
```

#### numeric-size (10)

- **Line 61:47** - `w-20`
  - Suggestion: Use size tokens through component token system

```
      <div className="space-y-2">
        <p>
>         Loading <Skeleton {...args} className="[w-20]" /> content
        </p>
        <p>
```

- **Line 64:47** - `w-32`
  - Suggestion: Use size tokens through component token system

```
        </p>
        <p>
>         Another <Skeleton {...args} className="[w-32]" /> example
        </p>
      </div>
```

- **Line 106:44** - `w-3`
  - Suggestion: Use size tokens through component token system

```
          <h3 className="text-sm font-semibold">Text Variant</h3>
          <Skeleton variant="text" />
>         <Skeleton variant="text" className="[w-3]/4" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
```

- **Line 107:44** - `w-1`
  - Suggestion: Use size tokens through component token system

```
          <Skeleton variant="text" />
          <Skeleton variant="text" className="w-3/4" />
>         <Skeleton variant="text" className="[w-1]/2" />
        </div>

```

- **Line 113:56** - `w-20`
  - Suggestion: Use size tokens through component token system

```
          <h3 className="text-sm font-semibold">Inline Variant</h3>
          <p>
>           Loading <Skeleton variant="inline" className="[w-20]" /> content inline
          </p>
        </div>
```

_... and 5 more violations of this type_

#### typography-size (5)

- **Line 104:23** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className="space-y-6">
        <div className="space-y-2">
>         <h3 className="[text-sm] font-semibold">Text Variant</h3>
          <Skeleton variant="text" />
          <Skeleton variant="text" className="w-3/4" />
```

- **Line 111:23** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

        <div className="space-y-2">
>         <h3 className="[text-sm] font-semibold">Inline Variant</h3>
          <p>
            Loading <Skeleton variant="inline" className="w-20" /> content inline
```

- **Line 118:23** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

        <div className="space-y-2">
>         <h3 className="[text-sm] font-semibold">Block Variant</h3>
          <Skeleton variant="block" />
        </div>
```

- **Line 123:23** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

        <div className="space-y-2">
>         <h3 className="[text-sm] font-semibold">Card Variant</h3>
          <Skeleton variant="card" />
        </div>
```

- **Line 128:23** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

        <div className="space-y-2">
>         <h3 className="[text-sm] font-semibold">Circle Variant</h3>
          <div className="flex gap-4">
            <Skeleton variant="circle" />
```

### src/components/data/table/Table.stories.tsx

**Violations:** 5

#### tailwind-text-color (1)

- **Line 229:44** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Additional Information</p>
>                       <p className="text-sm [text-muted]-foreground">Status: {user.status}</p>
                        <Button size="sm" variant="outline">
                          View Details
```

#### numeric-spacing (1)

- **Line 227:36** - `space-y-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
                  <TableRow>
                    <TableExpandableContent colSpan={3} expanded={isExpanded}>
>                     <div className="[space-y-2]">
                        <p className="text-sm font-medium">Additional Information</p>
                        <p className="text-sm text-muted-foreground">Status: {user.status}</p>
```

#### numeric-size (1)

- **Line 292:20** - `h-96`
  - Suggestion: Use size tokens through component token system

```
  export const StickyHeader: Story = {
    render: () => (
>     <div className="[h-96] overflow-auto">
        <Table data={sampleData} columns={[]} rowKey="id" stickyHeader>
          <TableHeader sticky>
```

#### typography-size (2)

- **Line 228:36** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                    <TableExpandableContent colSpan={3} expanded={isExpanded}>
                      <div className="space-y-2">
>                       <p className="[text-sm] font-medium">Additional Information</p>
                        <p className="text-sm text-muted-foreground">Status: {user.status}</p>
                        <Button size="sm" variant="outline">
```

- **Line 229:36** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Additional Information</p>
>                       <p className="[text-sm] text-muted-foreground">Status: {user.status}</p>
                        <Button size="sm" variant="outline">
                          View Details
```

### src/components/feedback/Progress.stories.tsx

**Violations:** 9

#### tailwind-bg-color (4)

- **Line 58:33** - `bg-secondary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
>               className="rounded [bg-secondary] px-sm py-xs text-sm text-secondary-foreground hover:bg-secondary/80"
              >
                -10%
```

- **Line 58:98** - `bg-secondary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
>               className="rounded [bg-secondary] px-sm py-xs text-sm text-secondary-foreground hover:bg-secondary/80"
              >
                -10%
```

- **Line 64:33** - `bg-secondary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
>               className="rounded [bg-secondary] px-sm py-xs text-sm text-secondary-foreground hover:bg-secondary/80"
              >
                +10%
```

- **Line 64:98** - `bg-secondary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
>               className="rounded [bg-secondary] px-sm py-xs text-sm text-secondary-foreground hover:bg-secondary/80"
              >
                +10%
```

#### tailwind-text-color (2)

- **Line 58:66** - `text-secondary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
>               className="rounded bg-secondary px-sm py-xs text-sm [text-secondary]-foreground hover:bg-secondary/80"
              >
                -10%
```

- **Line 64:66** - `text-secondary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
>               className="rounded bg-secondary px-sm py-xs text-sm [text-secondary]-foreground hover:bg-secondary/80"
              >
                +10%
```

#### typography-size (3)

- **Line 53:40** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="space-y-md">
          <div>
>           <label className="mb-sm block [text-sm] font-medium">Progress: {progress}%</label>
            <Progress value={progress} />
            <div className="mt-sm flex gap-sm">
```

- **Line 58:58** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
>               className="rounded bg-secondary px-sm py-xs [text-sm] text-secondary-foreground hover:bg-secondary/80"
              >
                -10%
```

- **Line 64:58** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
>               className="rounded bg-secondary px-sm py-xs [text-sm] text-secondary-foreground hover:bg-secondary/80"
              >
                +10%
```

### src/components/menus/DropdownMenu.stories.tsx

**Violations:** 1

#### tailwind-text-color (1)

- **Line 82:37** - `text-destructive`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          </DropdownMenuItem>
          <DropdownMenuSeparator />
>         <DropdownMenuItem className="[text-destructive]">
            <span className="mr-sm">🗑️</span>
            Delete
```

### src/components/menus/Tabs.stories.tsx

**Violations:** 20

#### tailwind-text-color (6)

- **Line 26:32** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div className="space-y-sm">
            <h3 className="text-lg font-medium">Account Settings</h3>
>           <p className="text-sm [text-muted]-foreground">
              Make changes to your account here. Click save when you're done.
            </p>
```

- **Line 34:32** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div className="space-y-sm">
            <h3 className="text-lg font-medium">Password Settings</h3>
>           <p className="text-sm [text-muted]-foreground">
              Change your password here. After saving, you'll be logged out.
            </p>
```

- **Line 55:32** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div className="space-y-sm">
            <h3 className="text-lg font-medium">Overview</h3>
>           <p className="text-sm [text-muted]-foreground">
              Get a summary of your account activity and performance.
            </p>
```

- **Line 63:32** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div className="space-y-sm">
            <h3 className="text-lg font-medium">Analytics</h3>
>           <p className="text-sm [text-muted]-foreground">
              View detailed analytics and insights about your data.
            </p>
```

- **Line 71:32** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div className="space-y-sm">
            <h3 className="text-lg font-medium">Reports</h3>
>           <p className="text-sm [text-muted]-foreground">
              Generate and download reports for your account.
            </p>
```

_... and 1 more violations of this type_

#### numeric-size (2)

- **Line 19:32** - `w-full`
  - Suggestion: Use size tokens through component token system

```
    render: () => (
      <Tabs defaultValue="account" className="w-[400px]">
>       <TabsList className="grid [w-full] grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
```

- **Line 46:32** - `w-full`
  - Suggestion: Use size tokens through component token system

```
    render: () => (
      <Tabs defaultValue="overview" className="w-[600px]">
>       <TabsList className="grid [w-full] grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
```

#### typography-size (12)

- **Line 25:25** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <TabsContent value="account" className="mt-md">
          <div className="space-y-sm">
>           <h3 className="[text-lg] font-medium">Account Settings</h3>
            <p className="text-sm text-muted-foreground">
              Make changes to your account here. Click save when you're done.
```

- **Line 26:24** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <div className="space-y-sm">
            <h3 className="text-lg font-medium">Account Settings</h3>
>           <p className="[text-sm] text-muted-foreground">
              Make changes to your account here. Click save when you're done.
            </p>
```

- **Line 33:25** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <TabsContent value="password" className="mt-md">
          <div className="space-y-sm">
>           <h3 className="[text-lg] font-medium">Password Settings</h3>
            <p className="text-sm text-muted-foreground">
              Change your password here. After saving, you'll be logged out.
```

- **Line 34:24** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <div className="space-y-sm">
            <h3 className="text-lg font-medium">Password Settings</h3>
>           <p className="[text-sm] text-muted-foreground">
              Change your password here. After saving, you'll be logged out.
            </p>
```

- **Line 54:25** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <TabsContent value="overview" className="mt-md">
          <div className="space-y-sm">
>           <h3 className="[text-lg] font-medium">Overview</h3>
            <p className="text-sm text-muted-foreground">
              Get a summary of your account activity and performance.
```

_... and 7 more violations of this type_

### src/components/modals/CustomDialog.stories.tsx

**Violations:** 16

#### tailwind-bg-color (8)

- **Line 29:30** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        <button
          onClick={() => setIsOpen(true)}
>         className="rounded-md [bg-primary] px-md py-sm text-primary-foreground hover:bg-primary/90"
        >
          Open Dialog
```

- **Line 29:83** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        <button
          onClick={() => setIsOpen(true)}
>         className="rounded-md [bg-primary] px-md py-sm text-primary-foreground hover:bg-primary/90"
        >
          Open Dialog
```

- **Line 38:34** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            <button
              onClick={() => setIsOpen(false)}
>             className="rounded-md [bg-primary] px-md py-sm text-primary-foreground hover:bg-primary/90"
            >
              Close
```

- **Line 38:87** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            <button
              onClick={() => setIsOpen(false)}
>             className="rounded-md [bg-primary] px-md py-sm text-primary-foreground hover:bg-primary/90"
            >
              Close
```

- **Line 60:32** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <button
            onClick={() => setIsOpen(true)}
>           className="rounded-md [bg-primary] px-md py-sm text-primary-foreground hover:bg-primary/90"
          >
            Open Dialog Without Title
```

_... and 3 more violations of this type_

#### tailwind-text-color (4)

- **Line 29:53** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <button
          onClick={() => setIsOpen(true)}
>         className="rounded-md bg-primary px-md py-sm [text-primary]-foreground hover:bg-primary/90"
        >
          Open Dialog
```

- **Line 38:57** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <button
              onClick={() => setIsOpen(false)}
>             className="rounded-md bg-primary px-md py-sm [text-primary]-foreground hover:bg-primary/90"
            >
              Close
```

- **Line 60:55** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <button
            onClick={() => setIsOpen(true)}
>           className="rounded-md bg-primary px-md py-sm [text-primary]-foreground hover:bg-primary/90"
          >
            Open Dialog Without Title
```

- **Line 69:59** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <button
                onClick={() => setIsOpen(false)}
>               className="rounded-md bg-primary px-md py-sm [text-primary]-foreground hover:bg-primary/90"
              >
                Close
```

#### numeric-radius (4)

- **Line 29:19** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
        <button
          onClick={() => setIsOpen(true)}
>         className="[rounded-md] bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
        >
          Open Dialog
```

- **Line 38:23** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
            <button
              onClick={() => setIsOpen(false)}
>             className="[rounded-md] bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
            >
              Close
```

- **Line 60:21** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
          <button
            onClick={() => setIsOpen(true)}
>           className="[rounded-md] bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
          >
            Open Dialog Without Title
```

- **Line 69:25** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
              <button
                onClick={() => setIsOpen(false)}
>               className="[rounded-md] bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
              >
                Close
```

### src/components/modals/Modal.stories.tsx

**Violations:** 4

#### tailwind-bg-color (1)

- **Line 100:39** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
              <p>This modal has more space for content.</p>
              <p>You can put forms, tables, or other complex content here.</p>
>             <div className="rounded-md [bg-muted] p-md">
                <h4 className="mb-sm font-semibold">Example Content</h4>
                <p className="text-sm text-muted-foreground">
```

#### tailwind-text-color (1)

- **Line 102:36** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <div className="rounded-md bg-muted p-md">
                <h4 className="mb-sm font-semibold">Example Content</h4>
>               <p className="text-sm [text-muted]-foreground">
                  This is an example of how you might structure content in a larger modal.
                </p>
```

#### numeric-radius (1)

- **Line 100:28** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
              <p>This modal has more space for content.</p>
              <p>You can put forms, tables, or other complex content here.</p>
>             <div className="[rounded-md] bg-muted p-md">
                <h4 className="mb-sm font-semibold">Example Content</h4>
                <p className="text-sm text-muted-foreground">
```

#### typography-size (1)

- **Line 102:28** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              <div className="rounded-md bg-muted p-md">
                <h4 className="mb-sm font-semibold">Example Content</h4>
>               <p className="[text-sm] text-muted-foreground">
                  This is an example of how you might structure content in a larger modal.
                </p>
```

### src/components/modals/SimpleModal.stories.tsx

**Violations:** 16

#### tailwind-bg-color (8)

- **Line 29:30** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        <button
          onClick={() => setIsOpen(true)}
>         className="rounded-md [bg-primary] px-md py-sm text-primary-foreground hover:bg-primary/90"
        >
          Open Modal
```

- **Line 29:83** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        <button
          onClick={() => setIsOpen(true)}
>         className="rounded-md [bg-primary] px-md py-sm text-primary-foreground hover:bg-primary/90"
        >
          Open Modal
```

- **Line 38:34** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            <button
              onClick={() => setIsOpen(false)}
>             className="rounded-md [bg-primary] px-md py-sm text-primary-foreground hover:bg-primary/90"
            >
              Close
```

- **Line 38:87** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            <button
              onClick={() => setIsOpen(false)}
>             className="rounded-md [bg-primary] px-md py-sm text-primary-foreground hover:bg-primary/90"
            >
              Close
```

- **Line 60:32** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <button
            onClick={() => setIsOpen(true)}
>           className="rounded-md [bg-primary] px-md py-sm text-primary-foreground hover:bg-primary/90"
          >
            Open Modal Without Title
```

_... and 3 more violations of this type_

#### tailwind-text-color (4)

- **Line 29:53** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <button
          onClick={() => setIsOpen(true)}
>         className="rounded-md bg-primary px-md py-sm [text-primary]-foreground hover:bg-primary/90"
        >
          Open Modal
```

- **Line 38:57** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <button
              onClick={() => setIsOpen(false)}
>             className="rounded-md bg-primary px-md py-sm [text-primary]-foreground hover:bg-primary/90"
            >
              Close
```

- **Line 60:55** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <button
            onClick={() => setIsOpen(true)}
>           className="rounded-md bg-primary px-md py-sm [text-primary]-foreground hover:bg-primary/90"
          >
            Open Modal Without Title
```

- **Line 69:59** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <button
                onClick={() => setIsOpen(false)}
>               className="rounded-md bg-primary px-md py-sm [text-primary]-foreground hover:bg-primary/90"
              >
                Close
```

#### numeric-radius (4)

- **Line 29:19** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
        <button
          onClick={() => setIsOpen(true)}
>         className="[rounded-md] bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
        >
          Open Modal
```

- **Line 38:23** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
            <button
              onClick={() => setIsOpen(false)}
>             className="[rounded-md] bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
            >
              Close
```

- **Line 60:21** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
          <button
            onClick={() => setIsOpen(true)}
>           className="[rounded-md] bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
          >
            Open Modal Without Title
```

- **Line 69:25** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
              <button
                onClick={() => setIsOpen(false)}
>               className="[rounded-md] bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
              >
                Close
```

### src/components/motion/Gestures.stories.tsx

**Violations:** 62

#### tailwind-bg-color (8)

- **Line 56:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      if (!isVisible) {
        return (
>         <div className="rounded-lg border [bg-card] p-4">
            <p className="text-muted-foreground">Toast dismissed! Will reappear in 1 second.</p>
          </div>
```

- **Line 64:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      return (
        <div className="w-96 space-y-4">
>         <div className="rounded-lg border [bg-card] p-4">
            <p className="mb-2 font-semibold">Swipe Gesture Info:</p>
            <p className="text-sm text-muted-foreground">
```

- **Line 74:138** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <div
            {...handlers}
>           className="group pointer-events-auto relative flex w-full items-center justify-between gap-sm overflow-hidden rounded-lg border [bg-background] p-md shadow-lg"
          >
            <div className="flex flex-1 items-start gap-sm">
```

- **Line 117:42** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      return (
        <div className="w-96 space-y-4">
>         <div className="rounded-lg border [bg-card] p-4">
            <p className="mb-2 font-semibold">Swipe Detection:</p>
            <p className="text-sm text-muted-foreground">
```

- **Line 125:96** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <div
            {...handlers}
>           className="flex h-48 w-full cursor-grab items-center justify-center rounded-lg border [bg-card] active:cursor-grabbing"
          >
            <p className="text-muted-foreground">Swipe in any direction</p>
```

_... and 3 more violations of this type_

#### tailwind-text-color (9)

- **Line 57:24** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        return (
          <div className="rounded-lg border bg-card p-4">
>           <p className="[text-muted]-foreground">Toast dismissed! Will reappear in 1 second.</p>
          </div>
        );
```

- **Line 66:32** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div className="rounded-lg border bg-card p-4">
            <p className="mb-2 font-semibold">Swipe Gesture Info:</p>
>           <p className="text-sm [text-muted]-foreground">
              {isSwiping
                ? `Swiping ${direction} (${Math.round(distance)}px)`
```

- **Line 85:47** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              variant="ghost"
              size="icon"
>             className="h-6 w-6 rounded-md p-xs [text-foreground]/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
              onClick={() => setIsVisible(false)}
              aria-label="Dismiss toast"
```

- **Line 85:101** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              variant="ghost"
              size="icon"
>             className="h-6 w-6 rounded-md p-xs [text-foreground]/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
              onClick={() => setIsVisible(false)}
              aria-label="Dismiss toast"
```

- **Line 119:32** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div className="rounded-lg border bg-card p-4">
            <p className="mb-2 font-semibold">Swipe Detection:</p>
>           <p className="text-sm [text-muted]-foreground">
              {isSwiping ? `Swiping ${direction} (${Math.round(distance)}px)` : swipeInfo}
            </p>
```

_... and 4 more violations of this type_

#### numeric-spacing (16)

- **Line 56:50** - `p-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      if (!isVisible) {
        return (
>         <div className="rounded-lg border bg-card [p-4]">
            <p className="text-muted-foreground">Toast dismissed! Will reappear in 1 second.</p>
          </div>
```

- **Line 63:27** - `space-y-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```

      return (
>       <div className="w-96 [space-y-4]">
          <div className="rounded-lg border bg-card p-4">
            <p className="mb-2 font-semibold">Swipe Gesture Info:</p>
```

- **Line 64:50** - `p-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      return (
        <div className="w-96 space-y-4">
>         <div className="rounded-lg border bg-card [p-4]">
            <p className="mb-2 font-semibold">Swipe Gesture Info:</p>
            <p className="text-sm text-muted-foreground">
```

- **Line 65:24** - `mb-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        <div className="w-96 space-y-4">
          <div className="rounded-lg border bg-card p-4">
>           <p className="[mb-2] font-semibold">Swipe Gesture Info:</p>
            <p className="text-sm text-muted-foreground">
              {isSwiping
```

- **Line 116:27** - `space-y-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```

      return (
>       <div className="w-96 [space-y-4]">
          <div className="rounded-lg border bg-card p-4">
            <p className="mb-2 font-semibold">Swipe Detection:</p>
```

_... and 11 more violations of this type_

#### numeric-radius (8)

- **Line 56:24** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
      if (!isVisible) {
        return (
>         <div className="[rounded-lg] border bg-card p-4">
            <p className="text-muted-foreground">Toast dismissed! Will reappear in 1 second.</p>
          </div>
```

- **Line 64:24** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
      return (
        <div className="w-96 space-y-4">
>         <div className="[rounded-lg] border bg-card p-4">
            <p className="mb-2 font-semibold">Swipe Gesture Info:</p>
            <p className="text-sm text-muted-foreground">
```

- **Line 74:120** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
          <div
            {...handlers}
>           className="group pointer-events-auto relative flex w-full items-center justify-between gap-sm overflow-hidden [rounded-lg] border bg-background p-md shadow-lg"
          >
            <div className="flex flex-1 items-start gap-sm">
```

- **Line 85:31** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
              variant="ghost"
              size="icon"
>             className="h-6 w-6 [rounded-md] p-xs text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
              onClick={() => setIsVisible(false)}
              aria-label="Dismiss toast"
```

- **Line 117:24** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
      return (
        <div className="w-96 space-y-4">
>         <div className="[rounded-lg] border bg-card p-4">
            <p className="mb-2 font-semibold">Swipe Detection:</p>
            <p className="text-sm text-muted-foreground">
```

_... and 3 more violations of this type_

#### numeric-size (13)

- **Line 63:22** - `w-96`
  - Suggestion: Use size tokens through component token system

```

      return (
>       <div className="[w-96] space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <p className="mb-2 font-semibold">Swipe Gesture Info:</p>
```

- **Line 74:61** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          <div
            {...handlers}
>           className="group pointer-events-auto relative flex [w-full] items-center justify-between gap-sm overflow-hidden rounded-lg border bg-background p-md shadow-lg"
          >
            <div className="flex flex-1 items-start gap-sm">
```

- **Line 85:23** - `h-6`
  - Suggestion: Use size tokens through component token system

```
              variant="ghost"
              size="icon"
>             className="[h-6] w-6 rounded-md p-xs text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
              onClick={() => setIsVisible(false)}
              aria-label="Dismiss toast"
```

- **Line 85:27** - `w-6`
  - Suggestion: Use size tokens through component token system

```
              variant="ghost"
              size="icon"
>             className="h-6 [w-6] rounded-md p-xs text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
              onClick={() => setIsVisible(false)}
              aria-label="Dismiss toast"
```

- **Line 89:26** - `h-4`
  - Suggestion: Use size tokens through component token system

```
              aria-label="Dismiss toast"
            >
>             <X className="[h-4] w-4" />
            </Button>
          </div>
```

_... and 8 more violations of this type_

#### typography-size (7)

- **Line 66:24** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <div className="rounded-lg border bg-card p-4">
            <p className="mb-2 font-semibold">Swipe Gesture Info:</p>
>           <p className="[text-sm] text-muted-foreground">
              {isSwiping
                ? `Swiping ${direction} (${Math.round(distance)}px)`
```

- **Line 78:30** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <div className="flex flex-1 items-start gap-sm">
              <div className="flex-1 space-y-xs">
>               <div className="[text-sm] font-semibold">Toast Notification</div>
                <div className="text-sm opacity-90">Swipe left or right to dismiss this toast</div>
              </div>
```

- **Line 79:30** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              <div className="flex-1 space-y-xs">
                <div className="text-sm font-semibold">Toast Notification</div>
>               <div className="[text-sm] opacity-90">Swipe left or right to dismiss this toast</div>
              </div>
            </div>
```

- **Line 119:24** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <div className="rounded-lg border bg-card p-4">
            <p className="mb-2 font-semibold">Swipe Detection:</p>
>           <p className="[text-sm] text-muted-foreground">
              {isSwiping ? `Swiping ${direction} (${Math.round(distance)}px)` : swipeInfo}
            </p>
```

- **Line 171:24** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <div className="rounded-lg border bg-card p-4">
            <p className="mb-2 font-semibold">Panel Swipe Info:</p>
>           <p className="[text-sm] text-muted-foreground">
              {isSwiping
                ? `Swiping right (${Math.round(distance)}px)`
```

_... and 2 more violations of this type_

#### transition-utility (1)

- **Line 85:76** - `transition-opacity`
  - Suggestion: Use MOTION_TOKENS for transitions

```
              variant="ghost"
              size="icon"
>             className="h-6 w-6 rounded-md p-xs text-foreground/50 opacity-0 [transition-opacity] hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
              onClick={() => setIsVisible(false)}
              aria-label="Dismiss toast"
```

### src/components/motion/Motion.stories.tsx

**Violations:** 104

#### tailwind-bg-color (22)

- **Line 40:32** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <button
            onClick={() => setIsVisible(!isVisible)}
>           className="rounded-md [bg-primary] px-4 py-2 text-primary-foreground"
          >
            Toggle Visibility
```

- **Line 44:85** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            Toggle Visibility
          </button>
>         <div className="flex h-32 w-64 items-center justify-center rounded-lg border [bg-card]">
            <div
              className={`h-16 w-32 rounded bg-primary ${
```

- **Line 46:42** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <div className="flex h-32 w-64 items-center justify-center rounded-lg border bg-card">
            <div
>             className={`h-16 w-32 rounded [bg-primary] ${
                isVisible ? "tm-motion-fade-in" : "tm-motion-fade-out"
              }`}
```

- **Line 67:32** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <button
            onClick={() => setIsVisible(!isVisible)}
>           className="rounded-md [bg-primary] px-4 py-2 text-primary-foreground"
          >
            Toggle Visibility
```

- **Line 71:85** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            Toggle Visibility
          </button>
>         <div className="flex h-32 w-64 items-center justify-center rounded-lg border [bg-card]">
            <div
              className={`h-16 w-32 rounded bg-primary ${
```

_... and 17 more violations of this type_

#### tailwind-text-color (13)

- **Line 40:53** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <button
            onClick={() => setIsVisible(!isVisible)}
>           className="rounded-md bg-primary px-4 py-2 [text-primary]-foreground"
          >
            Toggle Visibility
```

- **Line 67:53** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <button
            onClick={() => setIsVisible(!isVisible)}
>           className="rounded-md bg-primary px-4 py-2 [text-primary]-foreground"
          >
            Toggle Visibility
```

- **Line 95:55** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <button
              onClick={() => setDirection("up")}
>             className="rounded-md bg-primary px-4 py-2 [text-primary]-foreground"
            >
              Slide Up
```

- **Line 101:55** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <button
              onClick={() => setDirection("down")}
>             className="rounded-md bg-primary px-4 py-2 [text-primary]-foreground"
            >
              Slide Down
```

- **Line 107:55** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <button
              onClick={() => setDirection("left")}
>             className="rounded-md bg-primary px-4 py-2 [text-primary]-foreground"
            >
              Slide Left
```

_... and 8 more violations of this type_

#### numeric-spacing (31)

- **Line 37:22** - `space-y-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```

      return (
>       <div className="[space-y-4]">
          <button
            onClick={() => setIsVisible(!isVisible)}
```

- **Line 40:43** - `px-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <button
            onClick={() => setIsVisible(!isVisible)}
>           className="rounded-md bg-primary [px-4] py-2 text-primary-foreground"
          >
            Toggle Visibility
```

- **Line 40:48** - `py-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <button
            onClick={() => setIsVisible(!isVisible)}
>           className="rounded-md bg-primary px-4 [py-2] text-primary-foreground"
          >
            Toggle Visibility
```

- **Line 64:22** - `space-y-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```

      return (
>       <div className="[space-y-4]">
          <button
            onClick={() => setIsVisible(!isVisible)}
```

- **Line 67:43** - `px-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <button
            onClick={() => setIsVisible(!isVisible)}
>           className="rounded-md bg-primary [px-4] py-2 text-primary-foreground"
          >
            Toggle Visibility
```

_... and 26 more violations of this type_

#### numeric-radius (17)

- **Line 40:21** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
          <button
            onClick={() => setIsVisible(!isVisible)}
>           className="[rounded-md] bg-primary px-4 py-2 text-primary-foreground"
          >
            Toggle Visibility
```

- **Line 44:67** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
            Toggle Visibility
          </button>
>         <div className="flex h-32 w-64 items-center justify-center [rounded-lg] border bg-card">
            <div
              className={`h-16 w-32 rounded bg-primary ${
```

- **Line 67:21** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
          <button
            onClick={() => setIsVisible(!isVisible)}
>           className="[rounded-md] bg-primary px-4 py-2 text-primary-foreground"
          >
            Toggle Visibility
```

- **Line 71:67** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
            Toggle Visibility
          </button>
>         <div className="flex h-32 w-64 items-center justify-center [rounded-lg] border bg-card">
            <div
              className={`h-16 w-32 rounded bg-primary ${
```

- **Line 95:23** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
            <button
              onClick={() => setDirection("up")}
>             className="[rounded-md] bg-primary px-4 py-2 text-primary-foreground"
            >
              Slide Up
```

_... and 12 more violations of this type_

#### numeric-size (20)

- **Line 44:29** - `h-32`
  - Suggestion: Use size tokens through component token system

```
            Toggle Visibility
          </button>
>         <div className="flex [h-32] w-64 items-center justify-center rounded-lg border bg-card">
            <div
              className={`h-16 w-32 rounded bg-primary ${
```

- **Line 44:34** - `w-64`
  - Suggestion: Use size tokens through component token system

```
            Toggle Visibility
          </button>
>         <div className="flex h-32 [w-64] items-center justify-center rounded-lg border bg-card">
            <div
              className={`h-16 w-32 rounded bg-primary ${
```

- **Line 46:24** - `h-16`
  - Suggestion: Use size tokens through component token system

```
          <div className="flex h-32 w-64 items-center justify-center rounded-lg border bg-card">
            <div
>             className={`[h-16] w-32 rounded bg-primary ${
                isVisible ? "tm-motion-fade-in" : "tm-motion-fade-out"
              }`}
```

- **Line 46:29** - `w-32`
  - Suggestion: Use size tokens through component token system

```
          <div className="flex h-32 w-64 items-center justify-center rounded-lg border bg-card">
            <div
>             className={`h-16 [w-32] rounded bg-primary ${
                isVisible ? "tm-motion-fade-in" : "tm-motion-fade-out"
              }`}
```

- **Line 71:29** - `h-32`
  - Suggestion: Use size tokens through component token system

```
            Toggle Visibility
          </button>
>         <div className="flex [h-32] w-64 items-center justify-center rounded-lg border bg-card">
            <div
              className={`h-16 w-32 rounded bg-primary ${
```

_... and 15 more violations of this type_

#### typography-size (1)

- **Line 194:29** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              {isReducedMotion ? "Enabled" : "Disabled"}
            </p>
>           <p className="mt-2 [text-sm] text-muted-foreground">
              {isReducedMotion
                ? "Animations are disabled or minimized for accessibility."
```

### src/components/navigation/breadcrumbs/Breadcrumbs.stories.tsx

**Violations:** 2

#### tailwind-text-color (1)

- **Line 84:39** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      <Breadcrumbs.Root
        items={defaultItems}
>       separator={<span className="mx-1 [text-muted]-foreground">/</span>}
      />
    ),
```

#### numeric-spacing (1)

- **Line 84:34** - `mx-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      <Breadcrumbs.Root
        items={defaultItems}
>       separator={<span className="[mx-1] text-muted-foreground">/</span>}
      />
    ),
```

### src/components/navigation/segmented-control/SegmentedControl.stories.tsx

**Violations:** 7

#### numeric-spacing (4)

- **Line 53:22** - `space-y-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      const [value3, setValue3] = React.useState("option1");
      return (
>       <div className="[space-y-8]">
          <div>
            <h3 className="mb-2 text-sm font-medium">Small</h3>
```

- **Line 55:25** - `mb-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        <div className="space-y-8">
          <div>
>           <h3 className="[mb-2] text-sm font-medium">Small</h3>
            <SegmentedControl.Root value={value1} onValueChange={setValue1} size="sm">
              <SegmentedControl.Item value="option1" size="sm">
```

- **Line 69:25** - `mb-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          </div>
          <div>
>           <h3 className="[mb-2] text-sm font-medium">Medium (Default)</h3>
            <SegmentedControl.Root value={value2} onValueChange={setValue2} size="md">
              <SegmentedControl.Item value="option1" size="md">
```

- **Line 83:25** - `mb-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          </div>
          <div>
>           <h3 className="[mb-2] text-sm font-medium">Large</h3>
            <SegmentedControl.Root value={value3} onValueChange={setValue3} size="lg">
              <SegmentedControl.Item value="option1" size="lg">
```

#### typography-size (3)

- **Line 55:30** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="space-y-8">
          <div>
>           <h3 className="mb-2 [text-sm] font-medium">Small</h3>
            <SegmentedControl.Root value={value1} onValueChange={setValue1} size="sm">
              <SegmentedControl.Item value="option1" size="sm">
```

- **Line 69:30** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          </div>
          <div>
>           <h3 className="mb-2 [text-sm] font-medium">Medium (Default)</h3>
            <SegmentedControl.Root value={value2} onValueChange={setValue2} size="md">
              <SegmentedControl.Item value="option1" size="md">
```

- **Line 83:30** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          </div>
          <div>
>           <h3 className="mb-2 [text-sm] font-medium">Large</h3>
            <SegmentedControl.Root value={value3} onValueChange={setValue3} size="lg">
              <SegmentedControl.Item value="option1" size="lg">
```

### src/components/navigation/stepper/Stepper.stories.tsx

**Violations:** 5

#### tailwind-text-color (1)

- **Line 120:36** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <div className="rounded-md border p-4">
                <h3 className="font-semibold">Step 2 Content</h3>
>               <p className="text-sm [text-muted]-foreground">This is the content for step 2.</p>
              </div>
            </Stepper.Content>
```

#### numeric-spacing (2)

- **Line 115:22** - `space-y-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      ];
      return (
>       <div className="[space-y-4]">
          <Stepper.Root steps={steps} activeStep={1}>
            <Stepper.Content stepIndex={1} isActive={true}>
```

- **Line 118:46** - `p-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <Stepper.Root steps={steps} activeStep={1}>
            <Stepper.Content stepIndex={1} isActive={true}>
>             <div className="rounded-md border [p-4]">
                <h3 className="font-semibold">Step 2 Content</h3>
                <p className="text-sm text-muted-foreground">This is the content for step 2.</p>
```

#### numeric-radius (1)

- **Line 118:28** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
          <Stepper.Root steps={steps} activeStep={1}>
            <Stepper.Content stepIndex={1} isActive={true}>
>             <div className="[rounded-md] border p-4">
                <h3 className="font-semibold">Step 2 Content</h3>
                <p className="text-sm text-muted-foreground">This is the content for step 2.</p>
```

#### typography-size (1)

- **Line 120:28** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              <div className="rounded-md border p-4">
                <h3 className="font-semibold">Step 2 Content</h3>
>               <p className="[text-sm] text-muted-foreground">This is the content for step 2.</p>
              </div>
            </Stepper.Content>
```

### src/components/navigation/tabs/Tabs.stories.tsx

**Violations:** 18

#### numeric-spacing (15)

- **Line 45:26** - `p-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          </Tabs.List>
          <Tabs.Content value="tab1">
>           <div className="[p-4]">Content for Tab 1</div>
          </Tabs.Content>
          <Tabs.Content value="tab2">
```

- **Line 48:26** - `p-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          </Tabs.Content>
          <Tabs.Content value="tab2">
>           <div className="[p-4]">Content for Tab 2</div>
          </Tabs.Content>
          <Tabs.Content value="tab3">
```

- **Line 51:26** - `p-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          </Tabs.Content>
          <Tabs.Content value="tab3">
>           <div className="[p-4]">Content for Tab 3</div>
          </Tabs.Content>
        </Tabs.Root>
```

- **Line 64:22** - `space-y-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      const [value3, setValue3] = React.useState("tab1");
      return (
>       <div className="[space-y-8]">
          <div>
            <h3 className="mb-2 text-sm font-medium">Small</h3>
```

- **Line 66:25** - `mb-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        <div className="space-y-8">
          <div>
>           <h3 className="[mb-2] text-sm font-medium">Small</h3>
            <Tabs.Root value={value1} onValueChange={setValue1}>
              <Tabs.List size="sm">
```

_... and 10 more violations of this type_

#### typography-size (3)

- **Line 66:30** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="space-y-8">
          <div>
>           <h3 className="mb-2 [text-sm] font-medium">Small</h3>
            <Tabs.Root value={value1} onValueChange={setValue1}>
              <Tabs.List size="sm">
```

- **Line 82:30** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          </div>
          <div>
>           <h3 className="mb-2 [text-sm] font-medium">Medium (Default)</h3>
            <Tabs.Root value={value2} onValueChange={setValue2}>
              <Tabs.List size="md">
```

- **Line 98:30** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          </div>
          <div>
>           <h3 className="mb-2 [text-sm] font-medium">Large</h3>
            <Tabs.Root value={value3} onValueChange={setValue3}>
              <Tabs.List size="lg">
```

### src/components/notifications/NotificationCenter.stories.tsx

**Violations:** 2

#### tailwind-text-color (1)

- **Line 226:28** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        </div>
        <NotificationCenter.Panel isOpen={isOpen} onClose={() => setIsOpen(false)} />
>       <p className="text-sm [text-muted]-foreground">
          Use keyboard: Tab to navigate, Escape to close, Arrow keys in panel
        </p>
```

#### typography-size (1)

- **Line 226:20** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <NotificationCenter.Panel isOpen={isOpen} onClose={() => setIsOpen(false)} />
>       <p className="[text-sm] text-muted-foreground">
          Use keyboard: Tab to navigate, Escape to close, Arrow keys in panel
        </p>
```

### src/components/primitives/BrandShowcase.stories.tsx

**Violations:** 63

#### tailwind-text-color (18)

- **Line 55:48** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div>
            <h3 className="mb-sm text-xl font-bold">{brandName}</h3>
>           {description && <p className="text-sm [text-muted]-foreground">{description}</p>}
          </div>

```

- **Line 60:46** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          {/* Buttons */}
          <div className="space-y-sm">
>           <div className="text-xs font-medium [text-muted]-foreground">Buttons</div>
            <div className="flex flex-wrap gap-sm">
              <Button variant="primary" size="sm">
```

- **Line 79:46** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          {/* Badges */}
          <div className="space-y-sm">
>           <div className="text-xs font-medium [text-muted]-foreground">Badges</div>
            <div className="flex flex-wrap gap-sm">
              <Badge variant="primary">Primary</Badge>
```

- **Line 89:46** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          {/* Card */}
          <div className="space-y-sm">
>           <div className="text-xs font-medium [text-muted]-foreground">Card</div>
            <Card>
              <CardHeader>
```

- **Line 106:46** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          {/* Typography */}
          <div className="space-y-sm">
>           <div className="text-xs font-medium [text-muted]-foreground">Typography</div>
            <div className="space-y-xs">
              <h4 className="text-lg font-bold">Heading</h4>
```

_... and 13 more violations of this type_

#### numeric-size (4)

- **Line 295:33** - `h-8`
  - Suggestion: Use size tokens through component token system

```
                    <div className="flex gap-sm">
                      <div
>                       className="[h-8] w-16 rounded border"
                        style={{
                          backgroundColor: `hsl(var(--brand-${brandId || "default"}-primary-500, var(--primary-500)))`,
```

- **Line 295:37** - `w-16`
  - Suggestion: Use size tokens through component token system

```
                    <div className="flex gap-sm">
                      <div
>                       className="h-8 [w-16] rounded border"
                        style={{
                          backgroundColor: `hsl(var(--brand-${brandId || "default"}-primary-500, var(--primary-500)))`,
```

- **Line 307:33** - `h-8`
  - Suggestion: Use size tokens through component token system

```
                    <div className="flex gap-sm">
                      <div
>                       className="[h-8] w-16 rounded border"
                        style={{
                          backgroundColor: `hsl(var(--brand-${brandId || "default"}-accent-500, var(--accent-500)))`,
```

- **Line 307:37** - `w-16`
  - Suggestion: Use size tokens through component token system

```
                    <div className="flex gap-sm">
                      <div
>                       className="h-8 [w-16] rounded border"
                        style={{
                          backgroundColor: `hsl(var(--brand-${brandId || "default"}-accent-500, var(--accent-500)))`,
```

#### typography-size (39)

- **Line 54:31** - `text-xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="space-y-md">
          <div>
>           <h3 className="mb-sm [text-xl] font-bold">{brandName}</h3>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
```

- **Line 55:40** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <div>
            <h3 className="mb-sm text-xl font-bold">{brandName}</h3>
>           {description && <p className="[text-sm] text-muted-foreground">{description}</p>}
          </div>

```

- **Line 60:26** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          {/* Buttons */}
          <div className="space-y-sm">
>           <div className="[text-xs] font-medium text-muted-foreground">Buttons</div>
            <div className="flex flex-wrap gap-sm">
              <Button variant="primary" size="sm">
```

- **Line 79:26** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          {/* Badges */}
          <div className="space-y-sm">
>           <div className="[text-xs] font-medium text-muted-foreground">Badges</div>
            <div className="flex flex-wrap gap-sm">
              <Badge variant="primary">Primary</Badge>
```

- **Line 89:26** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          {/* Card */}
          <div className="space-y-sm">
>           <div className="[text-xs] font-medium text-muted-foreground">Card</div>
            <Card>
              <CardHeader>
```

_... and 34 more violations of this type_

#### direct-css-var (2)

- **Line 297:42** - `hsl(var(--brand-${brandId || "default"}-primary-500, var(--primary-500))`
  - Suggestion: Use token references instead of direct hsl(var(--\*))

```
                        className="h-8 w-16 rounded border"
                        style={{
>                         backgroundColor: `[hsl(var(--brand-${brandId || "default"}-primary-500, var(--primary-500))])`,
                        }}
                      />
```

- **Line 309:42** - `hsl(var(--brand-${brandId || "default"}-accent-500, var(--accent-500))`
  - Suggestion: Use token references instead of direct hsl(var(--\*))

```
                        className="h-8 w-16 rounded border"
                        style={{
>                         backgroundColor: `[hsl(var(--brand-${brandId || "default"}-accent-500, var(--accent-500))])`,
                        }}
                      />
```

### src/components/primitives/ThemeShowcase.stories.tsx

**Violations:** 14

#### tailwind-text-color (7)

- **Line 47:24** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div>
            <h2 className="mb-md text-2xl font-bold">Default Theme</h2>
>           <p className="[text-muted]-foreground">
              Standard Tenerife UI theme with default color palette.
            </p>
```

- **Line 89:24** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div>
            <h2 className="mb-md text-2xl font-bold">Dark Theme</h2>
>           <p className="[text-muted]-foreground">
              Enhanced dark theme with deeper surfaces and higher contrast.
            </p>
```

- **Line 131:24** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div>
            <h2 className="mb-md text-2xl font-bold">Brand Theme</h2>
>           <p className="[text-muted]-foreground">Brand-specific theme with custom color palette.</p>
          </div>
          <div className="flex flex-wrap gap-md">
```

- **Line 168:22** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div>
          <h2 className="mb-md text-3xl font-bold">All Available Themes</h2>
>         <p className="[text-muted]-foreground">Compare all themes side by side.</p>
        </div>
        <div className="grid grid-cols-1 gap-xl md:grid-cols-2 lg:grid-cols-3">
```

- **Line 181:40** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                  <CardTitle>{theme.name}</CardTitle>
                  {theme.description && (
>                   <p className="text-sm [text-muted]-foreground">{theme.description}</p>
                  )}
                </CardHeader>
```

_... and 2 more violations of this type_

#### typography-size (7)

- **Line 46:31** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="space-y-lg">
          <div>
>           <h2 className="mb-md [text-2xl] font-bold">Default Theme</h2>
            <p className="text-muted-foreground">
              Standard Tenerife UI theme with default color palette.
```

- **Line 88:31** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="space-y-lg">
          <div>
>           <h2 className="mb-md [text-2xl] font-bold">Dark Theme</h2>
            <p className="text-muted-foreground">
              Enhanced dark theme with deeper surfaces and higher contrast.
```

- **Line 130:31** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="space-y-lg">
          <div>
>           <h2 className="mb-md [text-2xl] font-bold">Brand Theme</h2>
            <p className="text-muted-foreground">Brand-specific theme with custom color palette.</p>
          </div>
```

- **Line 167:29** - `text-3xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className="space-y-xl">
        <div>
>         <h2 className="mb-md [text-3xl] font-bold">All Available Themes</h2>
          <p className="text-muted-foreground">Compare all themes side by side.</p>
        </div>
```

- **Line 181:32** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                  <CardTitle>{theme.name}</CardTitle>
                  {theme.description && (
>                   <p className="[text-sm] text-muted-foreground">{theme.description}</p>
                  )}
                </CardHeader>
```

_... and 2 more violations of this type_

### src/components/primitives/Typography.stories.tsx

**Violations:** 6

#### typography-size (6)

- **Line 31:23** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className="space-y-xl">
        <section className="space-y-md">
>         <h2 className="[text-2xl] font-semibold">Display</h2>
          <Display size="4xl" weight="bold">
            Display Text for Hero Sections
```

- **Line 41:23** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

        <section className="space-y-md">
>         <h2 className="[text-2xl] font-semibold">Headings</h2>
          <Heading level={1}>Heading Level 1</Heading>
          <Heading level={2}>Heading Level 2</Heading>
```

- **Line 51:23** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

        <section className="space-y-md">
>         <h2 className="[text-2xl] font-semibold">Lead Text</h2>
          <Lead size="xl">Extra large lead text for subtitles and introductions.</Lead>
          <Lead size="lg">Large lead text with default muted styling.</Lead>
```

- **Line 57:23** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

        <section className="space-y-md">
>         <h2 className="[text-2xl] font-semibold">Body Text</h2>
          <Body size="lg">
            Large body text. This size is useful for emphasis or when you need slightly larger body
```

- **Line 72:23** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

        <section className="space-y-md">
>         <h2 className="[text-2xl] font-semibold">Caption</h2>
          <Caption>Default caption text with muted styling.</Caption>
          <Caption muted={false}>Non-muted caption text.</Caption>
```

_... and 1 more violations of this type_

### src/components/sections/CTASection.stories.tsx

**Violations:** 1

#### numeric-spacing (1)

- **Line 266:20** - `space-y-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
  export const MultipleCTAs: Story = {
    render: () => (
>     <div className="[space-y-0]">
        <CTASection
          headline="First CTA Section"
```

### src/components/sections/FeatureSection.stories.tsx

**Violations:** 6

#### numeric-size (6)

- **Line 160:26** - `h-6`
  - Suggestion: Use size tokens through component token system

```
        {
          icon: (
>           <svg className="[h-6] w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
```

- **Line 160:30** - `w-6`
  - Suggestion: Use size tokens through component token system

```
        {
          icon: (
>           <svg className="h-6 [w-6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
```

- **Line 174:26** - `h-6`
  - Suggestion: Use size tokens through component token system

```
        {
          icon: (
>           <svg className="[h-6] w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
```

- **Line 174:30** - `w-6`
  - Suggestion: Use size tokens through component token system

```
        {
          icon: (
>           <svg className="h-6 [w-6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
```

- **Line 188:26** - `h-6`
  - Suggestion: Use size tokens through component token system

```
        {
          icon: (
>           <svg className="[h-6] w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
```

_... and 1 more violations of this type_

### src/components/sections/HeroSection.stories.tsx

**Violations:** 21

#### tailwind-bg-color (2)

- **Line 159:87** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      ),
      media: (
>       <div className="flex aspect-square w-full items-center justify-center rounded-lg [bg-primary]/10">
          <span className="text-5xl">♿</span>
        </div>
```

- **Line 188:86** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      ),
      media: (
>       <div className="flex aspect-video w-full items-center justify-center rounded-lg [bg-muted]">
          <span className="text-3xl text-muted-foreground">Media Content</span>
        </div>
```

#### tailwind-text-color (2)

- **Line 189:34** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      media: (
        <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-muted">
>         <span className="text-3xl [text-muted]-foreground">Media Content</span>
        </div>
      ),
```

- **Line 212:34** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div className="space-y-2 text-center">
            <div className="text-4xl">📱</div>
>           <div className="text-sm [text-muted]-foreground">Responsive Design</div>
          </div>
        </div>
```

#### numeric-spacing (1)

- **Line 210:24** - `space-y-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      media: (
        <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
>         <div className="[space-y-2] text-center">
            <div className="text-4xl">📱</div>
            <div className="text-sm text-muted-foreground">Responsive Design</div>
```

#### numeric-radius (5)

- **Line 105:75** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
      ),
      media: (
>       <div className="flex aspect-video w-full items-center justify-center [rounded-lg] bg-gradient-to-br from-primary/20 to-accent/20">
          <span className="text-4xl">🎨</span>
        </div>
```

- **Line 125:85** - `rounded-xl`
  - Suggestion: Use radius tokens through component token system

```
      ),
      media: (
>       <div className="flex aspect-video w-full max-w-2xl items-center justify-center [rounded-xl] bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30">
          <span className="text-6xl">✨</span>
        </div>
```

- **Line 159:76** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
      ),
      media: (
>       <div className="flex aspect-square w-full items-center justify-center [rounded-lg] bg-primary/10">
          <span className="text-5xl">♿</span>
        </div>
```

- **Line 188:75** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
      ),
      media: (
>       <div className="flex aspect-video w-full items-center justify-center [rounded-lg] bg-muted">
          <span className="text-3xl text-muted-foreground">Media Content</span>
        </div>
```

- **Line 209:75** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
      ),
      media: (
>       <div className="flex aspect-video w-full items-center justify-center [rounded-lg] bg-gradient-to-br from-primary/20 to-accent/20">
          <div className="space-y-2 text-center">
            <div className="text-4xl">📱</div>
```

#### numeric-size (5)

- **Line 105:40** - `w-full`
  - Suggestion: Use size tokens through component token system

```
      ),
      media: (
>       <div className="flex aspect-video [w-full] items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
          <span className="text-4xl">🎨</span>
        </div>
```

- **Line 125:40** - `w-full`
  - Suggestion: Use size tokens through component token system

```
      ),
      media: (
>       <div className="flex aspect-video [w-full] max-w-2xl items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30">
          <span className="text-6xl">✨</span>
        </div>
```

- **Line 159:41** - `w-full`
  - Suggestion: Use size tokens through component token system

```
      ),
      media: (
>       <div className="flex aspect-square [w-full] items-center justify-center rounded-lg bg-primary/10">
          <span className="text-5xl">♿</span>
        </div>
```

- **Line 188:40** - `w-full`
  - Suggestion: Use size tokens through component token system

```
      ),
      media: (
>       <div className="flex aspect-video [w-full] items-center justify-center rounded-lg bg-muted">
          <span className="text-3xl text-muted-foreground">Media Content</span>
        </div>
```

- **Line 209:40** - `w-full`
  - Suggestion: Use size tokens through component token system

```
      ),
      media: (
>       <div className="flex aspect-video [w-full] items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
          <div className="space-y-2 text-center">
            <div className="text-4xl">📱</div>
```

#### typography-size (6)

- **Line 106:25** - `text-4xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      media: (
        <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
>         <span className="[text-4xl]">🎨</span>
        </div>
      ),
```

- **Line 126:25** - `text-6xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      media: (
        <div className="flex aspect-video w-full max-w-2xl items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30">
>         <span className="[text-6xl]">✨</span>
        </div>
      ),
```

- **Line 160:25** - `text-5xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      media: (
        <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-primary/10">
>         <span className="[text-5xl]">♿</span>
        </div>
      ),
```

- **Line 189:25** - `text-3xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      media: (
        <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-muted">
>         <span className="[text-3xl] text-muted-foreground">Media Content</span>
        </div>
      ),
```

- **Line 211:26** - `text-4xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
          <div className="space-y-2 text-center">
>           <div className="[text-4xl]">📱</div>
            <div className="text-sm text-muted-foreground">Responsive Design</div>
          </div>
```

_... and 1 more violations of this type_

### src/components/toasts/Toast.stories.tsx

**Violations:** 2

#### typography-size (2)

- **Line 13:21** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    return (
      <div className="space-y-md p-md">
>       <h2 className="[text-lg] font-semibold">Toast Examples</h2>

        <div className="flex flex-wrap gap-sm">
```

- **Line 246:21** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    render: () => (
      <div className="space-y-md">
>       <h3 className="[text-lg] font-semibold">Different Toast Positions</h3>

        {(
```

### src/components/ui/caption.stories.tsx

**Violations:** 4

#### numeric-radius (1)

- **Line 75:27** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
            src="https://via.placeholder.com/400x200"
            alt="Placeholder"
>           className="mb-xs [rounded-md]"
          />
          <Caption>This is a caption for the image above.</Caption>
```

#### typography-size (3)

- **Line 71:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className="space-y-md">
        <div>
>         <h3 className="mb-xs [text-lg] font-semibold">Image Caption</h3>
          <img
            src="https://via.placeholder.com/400x200"
```

- **Line 80:28** - `text-base`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div>
>         <p className="mb-xs [text-base]">Form Field Label</p>
          <Caption>This is a helper text or caption for a form field.</Caption>
        </div>
```

- **Line 84:28** - `text-base`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div>
>         <p className="mb-xs [text-base]">Metadata</p>
          <Caption>Published on January 1, 2024 • 5 min read</Caption>
        </div>
```

### src/components/ui/code.stories.tsx

**Violations:** 2

#### typography-size (2)

- **Line 103:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      <div className="space-y-lg">
        <div>
>         <h3 className="mb-md [text-lg] font-semibold">JavaScript Example</h3>
          <Code variant="block">
            {`function greet(name) {
```

- **Line 113:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        </div>
        <div>
>         <h3 className="mb-md [text-lg] font-semibold">React Component</h3>
          <Code variant="block">
            {`import { Button } from '@tenerife.music/ui';
```

### src/components/ui/field.stories.tsx

**Violations:** 10

#### numeric-size (10)

- **Line 34:22** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const BasicInput: Story = {
    render: () => (
>     <Field className="[w-64]">
        <Field.Label htmlFor="basic-input">Email Address</Field.Label>
        <Field.Control>
```

- **Line 45:22** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const WithDescription: Story = {
    render: () => (
>     <Field className="[w-64]">
        <Field.Label htmlFor="desc-input">Username</Field.Label>
        <Field.Control>
```

- **Line 57:22** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const WithError: Story = {
    render: () => (
>     <Field className="[w-64]">
        <Field.Label htmlFor="error-input">Email Address</Field.Label>
        <Field.Control>
```

- **Line 69:22** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const RequiredField: Story = {
    render: () => (
>     <Field className="[w-64]">
        <Field.Label htmlFor="required-input" required>
          Full Name
```

- **Line 82:22** - `w-64`
  - Suggestion: Use size tokens through component token system

```
  export const TextareaField: Story = {
    render: () => (
>     <Field className="[w-64]">
        <Field.Label htmlFor="textarea-field">Message</Field.Label>
        <Field.Control>
```

_... and 5 more violations of this type_

### src/components/ui/lead.stories.tsx

**Violations:** 1

#### typography-size (1)

- **Line 76:21** - `text-4xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    render: () => (
      <div className="space-y-lg">
>       <h1 className="[text-4xl] font-bold">Main Heading</h1>
        <Lead size="lg">
          This is a subtitle that provides additional context or description for the main heading. It
```

## Other Components

**Total:** 658 violations

### src/components/SectionBuilder.presets.tsx

**Violations:** 18

#### tailwind-bg-color (2)

- **Line 203:80** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        <div className="space-y-md">
          {feature.icon && (
>           <div className="flex h-12 w-12 items-center justify-center rounded-lg [bg-primary]/10 text-primary">
              {feature.icon}
            </div>
```

- **Line 360:40** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      type: "text",
      content: (
>       <div className="rounded-lg border [bg-card] p-lg shadow-sm">
          <div className="space-y-md">
            {/* Quote */}
```

#### tailwind-text-color (6)

- **Line 203:94** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <div className="space-y-md">
          {feature.icon && (
>           <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 [text-primary]">
              {feature.icon}
            </div>
```

- **Line 208:22** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          )}
          <h3 className="text-xl font-semibold">{feature.title}</h3>
>         <p className="[text-muted]-foreground">{feature.description}</p>
          {feature.content}
        </div>
```

- **Line 363:48** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div className="space-y-md">
            {/* Quote */}
>           <blockquote className="text-lg italic [text-foreground]">{testimonial.quote}</blockquote>

            {/* Rating */}
```

- **Line 371:56** - `text-yellow-500`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                  <span
                    key={i}
>                   className={i < testimonial.rating! ? "[text-yellow-500]" : "text-muted"}
                  >
                    ★
```

- **Line 371:76** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                  <span
                    key={i}
>                   className={i < testimonial.rating! ? "text-yellow-500" : "[text-muted]"}
                  >
                    ★
```

_... and 1 more violations of this type_

#### numeric-radius (3)

- **Line 203:69** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
        <div className="space-y-md">
          {feature.icon && (
>           <div className="flex h-12 w-12 items-center justify-center [rounded-lg] bg-primary/10 text-primary">
              {feature.icon}
            </div>
```

- **Line 360:22** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
      type: "text",
      content: (
>       <div className="[rounded-lg] border bg-card p-lg shadow-sm">
          <div className="space-y-md">
            {/* Quote */}
```

- **Line 382:56** - `rounded-full`
  - Suggestion: Use radius tokens through component token system

```
            <div className="flex items-center gap-md">
              {testimonial.avatar && (
>               <div className="h-10 w-10 overflow-hidden [rounded-full]">{testimonial.avatar}</div>
              )}
              <div>
```

#### numeric-size (4)

- **Line 203:31** - `h-12`
  - Suggestion: Use size tokens through component token system

```
        <div className="space-y-md">
          {feature.icon && (
>           <div className="flex [h-12] w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {feature.icon}
            </div>
```

- **Line 203:36** - `w-12`
  - Suggestion: Use size tokens through component token system

```
        <div className="space-y-md">
          {feature.icon && (
>           <div className="flex h-12 [w-12] items-center justify-center rounded-lg bg-primary/10 text-primary">
              {feature.icon}
            </div>
```

- **Line 382:30** - `h-10`
  - Suggestion: Use size tokens through component token system

```
            <div className="flex items-center gap-md">
              {testimonial.avatar && (
>               <div className="[h-10] w-10 overflow-hidden rounded-full">{testimonial.avatar}</div>
              )}
              <div>
```

- **Line 382:35** - `w-10`
  - Suggestion: Use size tokens through component token system

```
            <div className="flex items-center gap-md">
              {testimonial.avatar && (
>               <div className="h-10 [w-10] overflow-hidden rounded-full">{testimonial.avatar}</div>
              )}
              <div>
```

#### typography-size (3)

- **Line 207:23** - `text-xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            </div>
          )}
>         <h3 className="[text-xl] font-semibold">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
          {feature.content}
```

- **Line 363:33** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <div className="space-y-md">
            {/* Quote */}
>           <blockquote className="[text-lg] italic text-foreground">{testimonial.quote}</blockquote>

            {/* Rating */}
```

- **Line 387:32** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                <div className="font-semibold">{testimonial.author}</div>
                {testimonial.role && (
>                 <div className="[text-sm] text-muted-foreground">{testimonial.role}</div>
                )}
              </div>
```

### src/components/SectionBuilder.tsx

**Violations:** 15

#### numeric-size (8)

- **Line 195:28** - `w-full`
  - Suggestion: Use size tokens through component token system

```
        const { content, className, aspectRatio } = slot;
        return (
>         <div className={cn("[w-full]", className)} style={aspectRatio ? { aspectRatio } : undefined}>
            {content}
          </div>
```

- **Line 281:35** - `min-w-0`
  - Suggestion: Use size tokens through component token system

```
        {contentFirst ? (
          <>
>           {left && <div className="[min-w-0] flex-1">{resolveSlot(left)}</div>}
            {media && (
              <div className={cn("min-w-0 flex-1", imagePosition === "left" && "order-first")}>
```

- **Line 283:32** - `min-w-0`
  - Suggestion: Use size tokens through component token system

```
            {left && <div className="min-w-0 flex-1">{resolveSlot(left)}</div>}
            {media && (
>             <div className={cn("[min-w-0] flex-1", imagePosition === "left" && "order-first")}>
                {resolveSlot(media)}
              </div>
```

- **Line 287:36** - `min-w-0`
  - Suggestion: Use size tokens through component token system

```
              </div>
            )}
>           {right && <div className="[min-w-0] flex-1">{resolveSlot(right)}</div>}
          </>
        ) : (
```

- **Line 291:36** - `min-w-0`
  - Suggestion: Use size tokens through component token system

```
        ) : (
          <>
>           {media && <div className="[min-w-0] flex-1">{resolveSlot(media)}</div>}
            {left && <div className="min-w-0 flex-1">{resolveSlot(left)}</div>}
            {right && <div className="min-w-0 flex-1">{resolveSlot(right)}</div>}
```

_... and 3 more violations of this type_

#### direct-css-var (7)

- **Line 50:35** - `hsl(var(--surface-*))`
  - Suggestion: Use token references instead of direct hsl(var(--\*))

```
    if (background.type === "surface") {
      // Surface colors use CSS variables set by theme system
>     // Map to CSS variable format: [hsl(var(--surface-*))]
      const surfaceVarMap: Record<string, string> = {
        base: "hsl(var(--surface-base))",
```

- **Line 52:13** - `hsl(var(--surface-base))`
  - Suggestion: Use token references instead of direct hsl(var(--\*))

```
      // Map to CSS variable format: hsl(var(--surface-*))
      const surfaceVarMap: Record<string, string> = {
>       base: "[hsl(var(--surface-base))]",
        elevated1: "hsl(var(--surface-elevated1))",
        elevated2: "hsl(var(--surface-elevated2))",
```

- **Line 53:18** - `hsl(var(--surface-elevated1))`
  - Suggestion: Use token references instead of direct hsl(var(--\*))

```
      const surfaceVarMap: Record<string, string> = {
        base: "hsl(var(--surface-base))",
>       elevated1: "[hsl(var(--surface-elevated1))]",
        elevated2: "hsl(var(--surface-elevated2))",
        elevated3: "hsl(var(--surface-elevated3))",
```

- **Line 54:18** - `hsl(var(--surface-elevated2))`
  - Suggestion: Use token references instead of direct hsl(var(--\*))

```
        base: "hsl(var(--surface-base))",
        elevated1: "hsl(var(--surface-elevated1))",
>       elevated2: "[hsl(var(--surface-elevated2))]",
        elevated3: "hsl(var(--surface-elevated3))",
        overlay: "hsl(var(--surface-overlay))",
```

- **Line 55:18** - `hsl(var(--surface-elevated3))`
  - Suggestion: Use token references instead of direct hsl(var(--\*))

```
        elevated1: "hsl(var(--surface-elevated1))",
        elevated2: "hsl(var(--surface-elevated2))",
>       elevated3: "[hsl(var(--surface-elevated3))]",
        overlay: "hsl(var(--surface-overlay))",
        glass: "hsl(var(--surface-glass))",
```

_... and 2 more violations of this type_

### src/components/auth/LoginForm.tsx

**Violations:** 1

#### numeric-size (1)

- **Line 57:25** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          </Field.Control>
        </Field>
>       <Button className="[w-full]">{loginButtonText}</Button>
      </div>
    );
```

### src/components/auth/ProfileCard.tsx

**Violations:** 3

#### tailwind-bg-color (1)

- **Line 29:89** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        <CardContent className="p-md">
          {avatar && (
>           <div className="mb-md h-[var(--spacing-md)] w-[var(--spacing-md)] rounded-full [bg-muted]" />
          )}
          <Heading level={3} className="mb-sm text-lg font-semibold">
```

#### numeric-radius (1)

- **Line 29:76** - `rounded-full`
  - Suggestion: Use radius tokens through component token system

```
        <CardContent className="p-md">
          {avatar && (
>           <div className="mb-md h-[var(--spacing-md)] w-[var(--spacing-md)] [rounded-full] bg-muted" />
          )}
          <Heading level={3} className="mb-sm text-lg font-semibold">
```

#### typography-size (1)

- **Line 31:44** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <div className="mb-md h-[var(--spacing-md)] w-[var(--spacing-md)] rounded-full bg-muted" />
          )}
>         <Heading level={3} className="mb-sm [text-lg] font-semibold">
            {name}
          </Heading>
```

### src/components/auth/RegisterForm.tsx

**Violations:** 1

#### numeric-size (1)

- **Line 73:25** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          </Field.Control>
        </Field>
>       <Button className="[w-full]">{registerButtonText}</Button>
      </div>
    );
```

### src/components/containers/Card.tsx

**Violations:** 2

#### tailwind-bg-color (1)

- **Line 63:44** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        <Box
          ref={ref}
>         className={cn("border border-border [bg-card] text-card-foreground", className)}
          radius={radiusValue}
          shadow={shadowValue}
```

#### tailwind-text-color (1)

- **Line 63:52** - `text-card`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        <Box
          ref={ref}
>         className={cn("border border-border bg-card [text-card]-foreground", className)}
          radius={radiusValue}
          shadow={shadowValue}
```

### src/components/containers/Section.tsx

**Violations:** 1

#### numeric-size (1)

- **Line 59:23** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          py={pyValue}
          gap={gapValue}
>         className={cn("[w-full]", className)}
          {...props}
        />
```

### src/components/controls/LanguageSelector.tsx

**Violations:** 3

#### tailwind-bg-color (1)

- **Line 78:40** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        disabled={disabled}
        className={cn(
>         "rounded-md border border-input [bg-background] px-sm py-sm text-sm",
          disabled && "cursor-not-allowed opacity-70",
          className,
```

#### numeric-radius (1)

- **Line 78:9** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
        disabled={disabled}
        className={cn(
>         "[rounded-md] border border-input bg-background px-sm py-sm text-sm",
          disabled && "cursor-not-allowed opacity-70",
          className,
```

#### typography-size (1)

- **Line 78:66** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        disabled={disabled}
        className={cn(
>         "rounded-md border border-input bg-background px-sm py-sm [text-sm]",
          disabled && "cursor-not-allowed opacity-70",
          className,
```

### src/components/data/List.tsx

**Violations:** 6

#### tailwind-bg-color (1)

- **Line 22:85** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      <div className={cn("space-y-sm", className)}>
        {items.map((item) => (
>         <div key={item.id} className="rounded-lg border p-md transition-colors hover:[bg-muted]/50">
            <h3 className="font-medium text-foreground">{item.title}</h3>
            {item.description && (
```

#### tailwind-text-color (2)

- **Line 23:37** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border p-md transition-colors hover:bg-muted/50">
>           <h3 className="font-medium [text-foreground]">{item.title}</h3>
            {item.description && (
              <p className="mt-xs text-sm text-muted-foreground">{item.description}</p>
```

- **Line 25:40** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <h3 className="font-medium text-foreground">{item.title}</h3>
            {item.description && (
>             <p className="mt-xs text-sm [text-muted]-foreground">{item.description}</p>
            )}
          </div>
```

#### numeric-radius (1)

- **Line 22:38** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
      <div className={cn("space-y-sm", className)}>
        {items.map((item) => (
>         <div key={item.id} className="[rounded-lg] border p-md transition-colors hover:bg-muted/50">
            <h3 className="font-medium text-foreground">{item.title}</h3>
            {item.description && (
```

#### typography-size (1)

- **Line 25:32** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <h3 className="font-medium text-foreground">{item.title}</h3>
            {item.description && (
>             <p className="mt-xs [text-sm] text-muted-foreground">{item.description}</p>
            )}
          </div>
```

#### transition-utility (1)

- **Line 22:61** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
      <div className={cn("space-y-sm", className)}>
        {items.map((item) => (
>         <div key={item.id} className="rounded-lg border p-md [transition-colors] hover:bg-muted/50">
            <h3 className="font-medium text-foreground">{item.title}</h3>
            {item.description && (
```

### src/components/data/Table.tsx

**Violations:** 3

#### tailwind-bg-color (1)

- **Line 43:69** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <tbody>
            {data.map((item) => (
>             <tr key={String(item[rowKey])} className="border-b hover:[bg-muted]/50">
                {columns.map((column) => (
                  <td key={String(column.key)} className="p-sm">
```

#### tailwind-text-color (1)

- **Line 34:54** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                <th
                  key={String(column.key)}
>                 className="p-sm text-left font-medium [text-muted]-foreground"
                >
                  {column.title}
```

#### numeric-size (1)

- **Line 28:24** - `w-full`
  - Suggestion: Use size tokens through component token system

```
    return (
      <div className={cn("overflow-x-auto", className)}>
>       <table className="[w-full] border-collapse">
          <thead>
            <tr className="border-b">
```

### src/components/data/Timeline.tsx

**Violations:** 6

#### tailwind-bg-color (1)

- **Line 27:76** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <div key={item.id} className="relative flex">
            <div className="flex flex-col items-center">
>             <div className="h-3 w-3 rounded-full border-2 border-background [bg-primary]" />
              {index < items.length - 1 && <div className="mt-sm h-12 w-px bg-border" />}
            </div>
```

#### tailwind-border-color (1)

- **Line 27:58** - `border-background`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
          <div key={item.id} className="relative flex">
            <div className="flex flex-col items-center">
>             <div className="h-3 w-3 rounded-full border-2 [border-background] bg-primary" />
              {index < items.length - 1 && <div className="mt-sm h-12 w-px bg-border" />}
            </div>
```

#### numeric-radius (1)

- **Line 27:36** - `rounded-full`
  - Suggestion: Use radius tokens through component token system

```
          <div key={item.id} className="relative flex">
            <div className="flex flex-col items-center">
>             <div className="h-3 w-3 [rounded-full] border-2 border-background bg-primary" />
              {index < items.length - 1 && <div className="mt-sm h-12 w-px bg-border" />}
            </div>
```

#### numeric-size (3)

- **Line 27:28** - `h-3`
  - Suggestion: Use size tokens through component token system

```
          <div key={item.id} className="relative flex">
            <div className="flex flex-col items-center">
>             <div className="[h-3] w-3 rounded-full border-2 border-background bg-primary" />
              {index < items.length - 1 && <div className="mt-sm h-12 w-px bg-border" />}
            </div>
```

- **Line 27:32** - `w-3`
  - Suggestion: Use size tokens through component token system

```
          <div key={item.id} className="relative flex">
            <div className="flex flex-col items-center">
>             <div className="h-3 [w-3] rounded-full border-2 border-background bg-primary" />
              {index < items.length - 1 && <div className="mt-sm h-12 w-px bg-border" />}
            </div>
```

- **Line 28:63** - `h-12`
  - Suggestion: Use size tokens through component token system

```
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full border-2 border-background bg-primary" />
>             {index < items.length - 1 && <div className="mt-sm [h-12] w-px bg-border" />}
            </div>
            <div className="ml-md flex-1">
```

### src/components/data/data-list/DataListLabel.tsx

**Violations:** 4

#### tailwind-text-color (1)

- **Line 31:30** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          ref={ref}
          className={cn(
>           "mb-1 font-semibold [text-foreground] md:mb-0",
            "md:w-32", // Default md width from tokens
            className,
```

#### numeric-spacing (2)

- **Line 31:11** - `mb-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          ref={ref}
          className={cn(
>           "[mb-1] font-semibold text-foreground md:mb-0",
            "md:w-32", // Default md width from tokens
            className,
```

- **Line 31:49** - `mb-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          ref={ref}
          className={cn(
>           "mb-1 font-semibold text-foreground md:[mb-0]",
            "md:w-32", // Default md width from tokens
            className,
```

#### numeric-size (1)

- **Line 32:14** - `w-32`
  - Suggestion: Use size tokens through component token system

```
          className={cn(
            "mb-1 font-semibold text-foreground md:mb-0",
>           "md:[w-32]", // Default md width from tokens
            className,
          )}
```

### src/components/data/data-list/DataListValue.tsx

**Violations:** 1

#### tailwind-text-color (1)

- **Line 27:42** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
    ({ className, children, ...props }, ref) => {
      return (
>       <dd ref={ref} className={cn("flex-1 [text-muted]-foreground", className)} {...props}>
          {children}
        </dd>
```

### src/components/data/empty-state/EmptyStateAction.tsx

**Violations:** 1

#### numeric-spacing (1)

- **Line 26:36** - `mt-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
    ({ className, children, ...props }, ref) => {
      return (
>       <div ref={ref} className={cn("[mt-2]", className)} {...props}>
          {children}
        </div>
```

### src/components/data/empty-state/EmptyStateDescription.tsx

**Violations:** 1

#### tailwind-text-color (1)

- **Line 32:20** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            DATA_TOKENS.emptyState.typography.description.fontSize,
            DATA_TOKENS.emptyState.typography.description.fontWeight,
>           "max-w-md [text-muted]-foreground",
            className,
          )}
```

### src/components/data/empty-state/EmptyStateIcon.tsx

**Violations:** 1

#### tailwind-text-color (1)

- **Line 38:44** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          ref={ref}
          className={cn(
>           "flex items-center justify-center [text-muted]-foreground",
            iconSizeClass,
            className,
```

### src/components/data/empty-state/EmptyStateTitle.tsx

**Violations:** 1

#### tailwind-text-color (1)

- **Line 32:11** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            DATA_TOKENS.emptyState.typography.title.fontSize,
            DATA_TOKENS.emptyState.typography.title.fontWeight,
>           "[text-foreground]",
            className,
          )}
```

### src/components/data/table/Table.tsx

**Violations:** 1

#### numeric-size (1)

- **Line 116:13** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          <table
            className={cn(
>             "[w-full] border-collapse",
              DATA_TOKENS.table.radius.default,
              DATA_TOKENS.table.shadow.subtle,
```

### src/components/data/table/TableEmpty.tsx

**Violations:** 1

#### numeric-spacing (1)

- **Line 25:41** - `p-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      return (
        <tr ref={ref} className={cn(className)} {...props}>
>         <td colSpan={colSpan} className="[p-8]">
            <EmptyState>
              <EmptyStateIcon>📭</EmptyStateIcon>
```

### src/components/data/table/TableExpandableContent.tsx

**Violations:** 3

#### numeric-spacing (1)

- **Line 28:11** - `p-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          colSpan={colSpan}
          className={cn(
>           "[p-0]",
            "overflow-hidden transition-all duration-normal ease-in-out",
            expanded ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0",
```

#### numeric-size (1)

- **Line 30:52** - `max-h-0`
  - Suggestion: Use size tokens through component token system

```
            "p-0",
            "overflow-hidden transition-all duration-normal ease-in-out",
>           expanded ? "max-h-[100vh] opacity-100" : "[max-h-0] opacity-0",
            className,
          )}
```

#### transition-utility (1)

- **Line 29:27** - `transition-all`
  - Suggestion: Use MOTION_TOKENS for transitions

```
          className={cn(
            "p-0",
>           "overflow-hidden [transition-all] duration-normal ease-in-out",
            expanded ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0",
            className,
```

### src/components/data/table/TableHead.tsx

**Violations:** 2

#### tailwind-bg-color (1)

- **Line 73:56** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            DATA_TOKENS.table.colors.border,
            "border-b",
>           sortable && "cursor-pointer select-none hover:[bg-muted]/50",
            className,
          )}
```

#### numeric-spacing (1)

- **Line 86:42** - `gap-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          {...props}
        >
>         <div className="flex items-center [gap-2]">
            {children}
            {sortable && <TableSortIcon direction={sortDirection} />}
```

### src/components/data/table/TableHeader.tsx

**Violations:** 2

#### tailwind-bg-color (1)

- **Line 25:51** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        <thead
          ref={ref}
>         className={cn(sticky && "sticky top-0 z-10 [bg-background]", className)}
          role="rowgroup"
          {...props}
```

#### numeric-spacing (1)

- **Line 25:40** - `top-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        <thead
          ref={ref}
>         className={cn(sticky && "sticky [top-0] z-10 bg-background", className)}
          role="rowgroup"
          {...props}
```

### src/components/data/table/TableLoadingState.tsx

**Violations:** 1

#### numeric-size (1)

- **Line 29:52** - `w-full`
  - Suggestion: Use size tokens through component token system

```
              {Array.from({ length: colSpan }).map((_, cellIndex) => (
                <td key={cellIndex} className="p-sm">
>                 <Skeleton variant="text" className="[w-full]" />
                </td>
              ))}
```

### src/components/data/table/TableSortIcon.tsx

**Violations:** 2

#### tailwind-text-color (1)

- **Line 27:43** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          ref={ref}
          className={cn(
>           "inline-flex size-4 items-center [text-muted]-foreground transition-transform",
            direction === "desc" && "rotate-180",
            !direction && "opacity-30",
```

#### transition-utility (1)

- **Line 27:65** - `transition-transform`
  - Suggestion: Use MOTION_TOKENS for transitions

```
          ref={ref}
          className={cn(
>           "inline-flex size-4 items-center text-muted-foreground [transition-transform]",
            direction === "desc" && "rotate-180",
            !direction && "opacity-30",
```

### src/components/feedback/ConsentBanner.tsx

**Violations:** 4

#### tailwind-bg-color (1)

- **Line 28:35** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```

    return (
>     <div className={cn("rounded-lg [bg-primary] p-md text-primary-foreground", className)}>
        <Text className="mb-2">{message}</Text>
        <Button>{acceptLabel}</Button>
```

#### tailwind-text-color (1)

- **Line 28:51** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```

    return (
>     <div className={cn("rounded-lg bg-primary p-md [text-primary]-foreground", className)}>
        <Text className="mb-2">{message}</Text>
        <Button>{acceptLabel}</Button>
```

#### numeric-spacing (1)

- **Line 29:23** - `mb-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
    return (
      <div className={cn("rounded-lg bg-primary p-md text-primary-foreground", className)}>
>       <Text className="[mb-2]">{message}</Text>
        <Button>{acceptLabel}</Button>
      </div>
```

#### numeric-radius (1)

- **Line 28:24** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```

    return (
>     <div className={cn("[rounded-lg] bg-primary p-md text-primary-foreground", className)}>
        <Text className="mb-2">{message}</Text>
        <Button>{acceptLabel}</Button>
```

### src/components/feedback/Progress.tsx

**Violations:** 7

#### tailwind-bg-color (2)

- **Line 17:48** - `bg-secondary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```

    return (
>     <div className={cn("h-2 w-full rounded-full [bg-secondary]", className)}>
        <div
          className="h-2 rounded-full bg-primary transition-[width] duration-normal"
```

- **Line 19:36** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      <div className={cn("h-2 w-full rounded-full bg-secondary", className)}>
        <div
>         className="h-2 rounded-full [bg-primary] transition-[width] duration-normal"
          style={{ width: `${percentage}%` }}
        />
```

#### numeric-radius (2)

- **Line 17:35** - `rounded-full`
  - Suggestion: Use radius tokens through component token system

```

    return (
>     <div className={cn("h-2 w-full [rounded-full] bg-secondary", className)}>
        <div
          className="h-2 rounded-full bg-primary transition-[width] duration-normal"
```

- **Line 19:23** - `rounded-full`
  - Suggestion: Use radius tokens through component token system

```
      <div className={cn("h-2 w-full rounded-full bg-secondary", className)}>
        <div
>         className="h-2 [rounded-full] bg-primary transition-[width] duration-normal"
          style={{ width: `${percentage}%` }}
        />
```

#### numeric-size (3)

- **Line 17:24** - `h-2`
  - Suggestion: Use size tokens through component token system

```

    return (
>     <div className={cn("[h-2] w-full rounded-full bg-secondary", className)}>
        <div
          className="h-2 rounded-full bg-primary transition-[width] duration-normal"
```

- **Line 17:28** - `w-full`
  - Suggestion: Use size tokens through component token system

```

    return (
>     <div className={cn("h-2 [w-full] rounded-full bg-secondary", className)}>
        <div
          className="h-2 rounded-full bg-primary transition-[width] duration-normal"
```

- **Line 19:19** - `h-2`
  - Suggestion: Use size tokens through component token system

```
      <div className={cn("h-2 w-full rounded-full bg-secondary", className)}>
        <div
>         className="[h-2] rounded-full bg-primary transition-[width] duration-normal"
          style={{ width: `${percentage}%` }}
        />
```

### src/components/image/Image.tsx

**Violations:** 14

#### numeric-radius (8)

- **Line 14:9** - `rounded-none`
  - Suggestion: Use radius tokens through component token system

```
  // Map radius to Tailwind classes
  const radiusClasses: Record<ImageRadius, string> = {
>   none: "[rounded-none]",
    sm: "rounded-sm",
    md: "rounded-md",
```

- **Line 15:7** - `rounded-sm`
  - Suggestion: Use radius tokens through component token system

```
  const radiusClasses: Record<ImageRadius, string> = {
    none: "rounded-none",
>   sm: "[rounded-sm]",
    md: "rounded-md",
    lg: "rounded-lg",
```

- **Line 16:7** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
    none: "rounded-none",
    sm: "rounded-sm",
>   md: "[rounded-md]",
    lg: "rounded-lg",
    xl: "rounded-xl",
```

- **Line 17:7** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
    sm: "rounded-sm",
    md: "rounded-md",
>   lg: "[rounded-lg]",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
```

- **Line 18:7** - `rounded-xl`
  - Suggestion: Use radius tokens through component token system

```
    md: "rounded-md",
    lg: "rounded-lg",
>   xl: "[rounded-xl]",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
```

_... and 3 more violations of this type_

#### numeric-size (6)

- **Line 258:15** - `w-full`
  - Suggestion: Use size tokens through component token system

```
              : aspectRatio)),
        // If fill is used, ensure container is relative (already added above)
>       fill && "[w-full] h-full",
        wrapperClassName,
      );
```

- **Line 258:22** - `h-full`
  - Suggestion: Use size tokens through component token system

```
              : aspectRatio)),
        // If fill is used, ensure container is relative (already added above)
>       fill && "w-full [h-full]",
        wrapperClassName,
      );
```

- **Line 266:32** - `w-full`
  - Suggestion: Use size tokens through component token system

```
        // Ensure image respects container bounds when fill is used or radius is applied
        (fill || radius !== "none") && "object-cover",
>       fill && "absolute inset-0 [w-full] h-full",
        className,
      );
```

- **Line 266:39** - `h-full`
  - Suggestion: Use size tokens through component token system

```
        // Ensure image respects container bounds when fill is used or radius is applied
        (fill || radius !== "none") && "object-cover",
>       fill && "absolute inset-0 w-full [h-full]",
        className,
      );
```

- **Line 291:74** - `h-full`
  - Suggestion: Use size tokens through component token system

```
      return (
        <div ref={ref} className={wrapperClasses}>
>         {shouldShowSkeleton && <Skeleton className="absolute inset-0 z-10 [h-full] w-full" />}
          {hasValidSrc ? (
            <img
```

_... and 1 more violations of this type_

### src/components/menus/DropdownMenu.tsx

**Violations:** 69

#### tailwind-bg-color (8)

- **Line 30:102** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:[bg-accent] data-[state=open]:bg-accent",
        inset && "pl-8",
        className,
```

- **Line 30:130** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:[bg-accent] data-[state=open]:bg-accent",
        inset && "pl-8",
        className,
```

- **Line 49:392** - `bg-popover`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 overflow-hidden rounded-md border [bg-popover] p-1 text-popover-foreground shadow-lg",
        className,
      )}
```

- **Line 66:394** - `bg-popover`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        sideOffset={sideOffset}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 overflow-hidden rounded-md border [bg-popover] p-1 text-popover-foreground shadow-md",
          className,
        )}
```

- **Line 84:129** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:[bg-accent] focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className,
```

_... and 3 more violations of this type_

#### tailwind-text-color (5)

- **Line 49:407** - `text-popover`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 [text-popover]-foreground shadow-lg",
        className,
      )}
```

- **Line 66:409** - `text-popover`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        sideOffset={sideOffset}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 [text-popover]-foreground shadow-md",
          className,
        )}
```

- **Line 84:145** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:[text-accent]-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className,
```

- **Line 100:150** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:[text-accent]-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
```

- **Line 123:150** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:[text-accent]-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
```

#### numeric-spacing (29)

- **Line 30:63** - `px-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      ref={ref}
      className={cn(
>       "flex cursor-default select-none items-center rounded-sm [px-2] py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        inset && "pl-8",
        className,
```

- **Line 30:68** - `py-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      ref={ref}
      className={cn(
>       "flex cursor-default select-none items-center rounded-sm px-2 [py-1].5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        inset && "pl-8",
        className,
```

- **Line 31:16** - `pl-8`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
>       inset && "[pl-8]",
        className,
      )}
```

- **Line 49:221** - `top-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      ref={ref}
      className={cn(
>       "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-[top-2] data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
        className,
      )}
```

- **Line 49:258** - `right-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      ref={ref}
      className={cn(
>       "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-[right-2] data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
        className,
      )}
```

_... and 24 more violations of this type_

#### numeric-radius (6)

- **Line 30:52** - `rounded-sm`
  - Suggestion: Use radius tokens through component token system

```
      ref={ref}
      className={cn(
>       "flex cursor-default select-none items-center [rounded-sm] px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        inset && "pl-8",
        className,
```

- **Line 49:374** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
      ref={ref}
      className={cn(
>       "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 overflow-hidden [rounded-md] border bg-popover p-1 text-popover-foreground shadow-lg",
        className,
      )}
```

- **Line 66:376** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
        sideOffset={sideOffset}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 overflow-hidden [rounded-md] border bg-popover p-1 text-popover-foreground shadow-md",
          className,
        )}
```

- **Line 84:61** - `rounded-sm`
  - Suggestion: Use radius tokens through component token system

```
      ref={ref}
      className={cn(
>       "relative flex cursor-default select-none items-center [rounded-sm] px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className,
```

- **Line 100:61** - `rounded-sm`
  - Suggestion: Use radius tokens through component token system

```
      ref={ref}
      className={cn(
>       "relative flex cursor-default select-none items-center [rounded-sm] py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
```

_... and 1 more violations of this type_

#### numeric-size (12)

- **Line 37:37** - `h-4`
  - Suggestion: Use size tokens through component token system

```
    >
      {children}
>     <ChevronRight className="ml-auto [h-4] w-4" />
    </DropdownMenuPrimitive.SubTrigger>
  ));
```

- **Line 37:41** - `w-4`
  - Suggestion: Use size tokens through component token system

```
    >
      {children}
>     <ChevronRight className="ml-auto h-4 [w-4]" />
    </DropdownMenuPrimitive.SubTrigger>
  ));
```

- **Line 49:349** - `min-w-32`
  - Suggestion: Use size tokens through component token system

```
      ref={ref}
      className={cn(
>       "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 [min-w-32] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
        className,
      )}
```

- **Line 66:351** - `min-w-32`
  - Suggestion: Use size tokens through component token system

```
        sideOffset={sideOffset}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 [min-w-32] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          className,
        )}
```

- **Line 106:42** - `h-3`
  - Suggestion: Use size tokens through component token system

```
      {...props}
    >
>     <span className="absolute left-2 flex [h-3].5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
```

_... and 7 more violations of this type_

#### typography-size (6)

- **Line 30:75** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      ref={ref}
      className={cn(
>       "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 [text-sm] outline-none focus:bg-accent data-[state=open]:bg-accent",
        inset && "pl-8",
        className,
```

- **Line 84:84** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      ref={ref}
      className={cn(
>       "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 [text-sm] outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className,
```

- **Line 100:89** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      ref={ref}
      className={cn(
>       "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 [text-sm] outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
```

- **Line 123:89** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      ref={ref}
      className={cn(
>       "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 [text-sm] outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
```

- **Line 146:31** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    <DropdownMenuPrimitive.Label
      ref={ref}
>     className={cn("px-2 py-1.5 [text-sm] font-semibold", inset && "pl-8", className)}
      {...props}
    />
```

_... and 1 more violations of this type_

#### transition-utility (3)

- **Line 84:105** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
      ref={ref}
      className={cn(
>       "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none [transition-colors] focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className,
```

- **Line 100:110** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
      ref={ref}
      className={cn(
>       "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none [transition-colors] focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
```

- **Line 123:110** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
      ref={ref}
      className={cn(
>       "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none [transition-colors] focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
```

### src/components/menus/NavigationMenu.tsx

**Violations:** 30

#### tailwind-bg-color (6)

- **Line 40:71** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```

  const navigationMenuTriggerStyle = cva(
>   "group inline-flex h-10 w-max items-center justify-center rounded-md [bg-background] px-md py-sm text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  );

```

- **Line 40:141** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```

  const navigationMenuTriggerStyle = cva(
>   "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-md py-sm text-sm font-medium transition-colors hover:[bg-accent] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  );

```

- **Line 40:186** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```

  const navigationMenuTriggerStyle = cva(
>   "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-md py-sm text-sm font-medium transition-colors hover:[bg-accent] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  );

```

- **Line 40:307** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```

  const navigationMenuTriggerStyle = cva(
>   "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-md py-sm text-sm font-medium transition-colors hover:[bg-accent] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  );

```

- **Line 40:338** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```

  const navigationMenuTriggerStyle = cva(
>   "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-md py-sm text-sm font-medium transition-colors hover:[bg-accent] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  );

```

_... and 1 more violations of this type_

#### tailwind-text-color (3)

- **Line 40:157** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```

  const navigationMenuTriggerStyle = cva(
>   "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-md py-sm text-sm font-medium transition-colors hover:bg-accent hover:[text-accent]-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  );

```

- **Line 40:202** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```

  const navigationMenuTriggerStyle = cva(
>   "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-md py-sm text-sm font-medium transition-colors hover:bg-accent hover:[text-accent]-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  );

```

- **Line 85:422** - `text-popover`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      <NavigationMenuPrimitive.Viewport
        className={cn(
>         "origin-top-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover [text-popover]-foreground shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
```

#### numeric-spacing (9)

- **Line 54:33** - `ml-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      {children}{" "}
      <ChevronDown
>       className="relative top-px [ml-1] h-3 w-3 transition duration-fast group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
```

- **Line 68:307** - `left-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      ref={ref}
      className={cn(
>       "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 [left-0] top-0 w-full md:absolute md:w-auto",
        className,
      )}
```

- **Line 68:314** - `top-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      ref={ref}
      className={cn(
>       "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 left-0 [top-0] w-full md:absolute md:w-auto",
        className,
      )}
```

- **Line 82:31** - `left-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
  >(({ className, ...props }, ref) => (
>   <div className={cn("absolute [left-0] top-full flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        className={cn(
```

- **Line 85:182** - `top-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      <NavigationMenuPrimitive.Viewport
        className={cn(
>         "origin-top-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 data-[side=bottom]:slide-in-from-[top-2] data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
```

_... and 4 more violations of this type_

#### numeric-radius (2)

- **Line 40:60** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```

  const navigationMenuTriggerStyle = cva(
>   "group inline-flex h-10 w-max items-center justify-center [rounded-md] bg-background px-md py-sm text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  );

```

- **Line 85:393** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
      <NavigationMenuPrimitive.Viewport
        className={cn(
>         "origin-top-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden [rounded-md] border bg-popover text-popover-foreground shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
```

#### numeric-size (8)

- **Line 40:21** - `h-10`
  - Suggestion: Use size tokens through component token system

```

  const navigationMenuTriggerStyle = cva(
>   "group inline-flex [h-10] w-max items-center justify-center rounded-md bg-background px-md py-sm text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  );

```

- **Line 54:38** - `h-3`
  - Suggestion: Use size tokens through component token system

```
      {children}{" "}
      <ChevronDown
>       className="relative top-px ml-1 [h-3] w-3 transition duration-fast group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
```

- **Line 54:42** - `w-3`
  - Suggestion: Use size tokens through component token system

```
      {children}{" "}
      <ChevronDown
>       className="relative top-px ml-1 h-3 [w-3] transition duration-fast group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
```

- **Line 68:320** - `w-full`
  - Suggestion: Use size tokens through component token system

```
      ref={ref}
      className={cn(
>       "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 left-0 top-0 [w-full] md:absolute md:w-auto",
        className,
      )}
```

- **Line 85:370** - `w-full`
  - Suggestion: Use size tokens through component token system

```
      <NavigationMenuPrimitive.Viewport
        className={cn(
>         "origin-top-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] [w-full] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
```

_... and 3 more violations of this type_

#### typography-size (1)

- **Line 40:97** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

  const navigationMenuTriggerStyle = cva(
>   "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-md py-sm [text-sm] font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  );

```

#### transition-utility (1)

- **Line 40:117** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```

  const navigationMenuTriggerStyle = cva(
>   "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-md py-sm text-sm font-medium [transition-colors] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  );

```

### src/components/menus/Tabs.tsx

**Violations:** 12

#### tailwind-bg-color (2)

- **Line 17:63** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "inline-flex h-10 items-center justify-center rounded-md [bg-muted] p-1 text-muted-foreground",
        className,
      )}
```

- **Line 32:347** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-[background-color,color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:[bg-background] data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className,
      )}
```

#### tailwind-text-color (2)

- **Line 17:76** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 [text-muted]-foreground",
        className,
      )}
```

- **Line 32:381** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-[background-color,color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:[text-foreground] data-[state=active]:shadow-sm",
        className,
      )}
```

#### numeric-spacing (4)

- **Line 17:72** - `p-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      ref={ref}
      className={cn(
>       "inline-flex h-10 items-center justify-center rounded-md bg-muted [p-1] text-muted-foreground",
        className,
      )}
```

- **Line 32:76** - `px-3`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      ref={ref}
      className={cn(
>       "inline-flex items-center justify-center whitespace-nowrap rounded-sm [px-3] py-1.5 text-sm font-medium ring-offset-background transition-[background-color,color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className,
      )}
```

- **Line 32:81** - `py-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      ref={ref}
      className={cn(
>       "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 [py-1].5 text-sm font-medium ring-offset-background transition-[background-color,color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className,
      )}
```

- **Line 47:7** - `mt-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      ref={ref}
      className={cn(
>       "[mt-2] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
```

#### numeric-radius (2)

- **Line 17:52** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
      ref={ref}
      className={cn(
>       "inline-flex h-10 items-center justify-center [rounded-md] bg-muted p-1 text-muted-foreground",
        className,
      )}
```

- **Line 32:65** - `rounded-sm`
  - Suggestion: Use radius tokens through component token system

```
      ref={ref}
      className={cn(
>       "inline-flex items-center justify-center whitespace-nowrap [rounded-sm] px-3 py-1.5 text-sm font-medium ring-offset-background transition-[background-color,color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className,
      )}
```

#### numeric-size (1)

- **Line 17:19** - `h-10`
  - Suggestion: Use size tokens through component token system

```
      ref={ref}
      className={cn(
>       "inline-flex [h-10] items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
```

#### typography-size (1)

- **Line 32:88** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      ref={ref}
      className={cn(
>       "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 [text-sm] font-medium ring-offset-background transition-[background-color,color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className,
      )}
```

### src/components/menus/context-menu/ContextMenuContent.tsx

**Violations:** 2

#### tailwind-bg-color (1)

- **Line 128:39** - `bg-popover`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            aria-labelledby={triggerId}
            className={cn(
>             "z-50 border border-border [bg-popover] text-popover-foreground outline-none",
              `${MENU_TOKENS.content.padding.md} ${MENU_TOKENS.content.radius.md} ${MENU_TOKENS.content.shadow.md} ${MENU_TOKENS.content.minWidth.md}`,
              "overflow-hidden",
```

#### tailwind-text-color (1)

- **Line 128:50** - `text-popover`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            aria-labelledby={triggerId}
            className={cn(
>             "z-50 border border-border bg-popover [text-popover]-foreground outline-none",
              `${MENU_TOKENS.content.padding.md} ${MENU_TOKENS.content.radius.md} ${MENU_TOKENS.content.shadow.md} ${MENU_TOKENS.content.minWidth.md}`,
              "overflow-hidden",
```

### src/components/modals/Modal.tsx

**Violations:** 13

#### tailwind-bg-color (3)

- **Line 24:58** - `bg-black`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      <DialogPrimitive.Overlay
        ref={ref}
>       className={cn("tm-motion-fade-in fixed inset-0 z-50 [bg-black]/80", className)}
        {...props}
      />
```

- **Line 41:137** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          ref={ref}
          className={cn(
>           "tm-motion-fade-scale fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-md border [bg-background] p-lg shadow-lg sm:rounded-lg",
            className,
          )}
```

- **Line 47:264** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        >
          {children}
>         <DialogPrimitive.Close className="absolute right-md top-md rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:[bg-accent] data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
```

#### tailwind-text-color (2)

- **Line 47:292** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        >
          {children}
>         <DialogPrimitive.Close className="absolute right-md top-md rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:[text-muted]-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
```

- **Line 88:27** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
    <DialogPrimitive.Description
      ref={ref}
>     className={cn("text-sm [text-muted]-foreground", className)}
      {...props}
    />
```

#### numeric-radius (2)

- **Line 41:169** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
          ref={ref}
          className={cn(
>           "tm-motion-fade-scale fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-md border bg-background p-lg shadow-lg sm:[rounded-lg]",
            className,
          )}
```

- **Line 47:67** - `rounded-sm`
  - Suggestion: Use radius tokens through component token system

```
        >
          {children}
>         <DialogPrimitive.Close className="absolute right-md top-md [rounded-sm] opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
```

#### numeric-size (3)

- **Line 41:69** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          ref={ref}
          className={cn(
>           "tm-motion-fade-scale fixed left-[50%] top-[50%] z-50 grid [w-full] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-md border bg-background p-lg shadow-lg sm:rounded-lg",
            className,
          )}
```

- **Line 48:24** - `h-4`
  - Suggestion: Use size tokens through component token system

```
          {children}
          <DialogPrimitive.Close className="absolute right-md top-md rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
>           <X className="[h-4] w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
```

- **Line 48:28** - `w-4`
  - Suggestion: Use size tokens through component token system

```
          {children}
          <DialogPrimitive.Close className="absolute right-md top-md rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
>           <X className="h-4 [w-4]" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
```

#### typography-size (2)

- **Line 76:19** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    <DialogPrimitive.Title
      ref={ref}
>     className={cn("[text-lg] font-semibold leading-none tracking-tight", className)}
      {...props}
    />
```

- **Line 88:19** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    <DialogPrimitive.Description
      ref={ref}
>     className={cn("[text-sm] text-muted-foreground", className)}
      {...props}
    />
```

#### transition-utility (1)

- **Line 47:112** - `transition-opacity`
  - Suggestion: Use MOTION_TOKENS for transitions

```
        >
          {children}
>         <DialogPrimitive.Close className="absolute right-md top-md rounded-sm opacity-70 ring-offset-background [transition-opacity] hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
```

### src/components/modals/SimpleModal.tsx

**Violations:** 22

#### tailwind-bg-color (2)

- **Line 44:160** - `bg-black`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <DialogPrimitive.Overlay
            aria-hidden="true"
>           className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40 [bg-black]/50 backdrop-blur-sm"
          />
          <DialogPrimitive.Content
```

- **Line 51:264** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            aria-describedby={description ? descriptionId : undefined}
            className={cn(
>             "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 shadow-elevation-xl fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border [bg-card] focus:outline-none",
              className,
            )}
```

#### tailwind-text-color (4)

- **Line 59:66** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <DialogPrimitive.Title
                id={titleId}
>               className="border-b px-6 py-4 text-lg font-semibold [text-foreground]"
              >
                {title}
```

- **Line 68:40** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                <DialogPrimitive.Description
                  id={descriptionId}
>                 className="mb-4 text-sm [text-muted]-foreground"
                >
                  {description}
```

- **Line 78:57** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <DialogPrimitive.Close
                className={cn(
>                 "absolute right-4 top-4 rounded-full p-1 [text-muted]-foreground transition-colors hover:text-foreground",
                  focusRing,
                )}
```

- **Line 78:103** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <DialogPrimitive.Close
                className={cn(
>                 "absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:[text-foreground]",
                  focusRing,
                )}
```

#### numeric-spacing (9)

- **Line 51:161** - `left-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            aria-describedby={description ? descriptionId : undefined}
            className={cn(
>             "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 shadow-elevation-xl fixed [left-1]/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-card focus:outline-none",
              className,
            )}
```

- **Line 51:170** - `top-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            aria-describedby={description ? descriptionId : undefined}
            className={cn(
>             "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 shadow-elevation-xl fixed left-1/2 [top-1]/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-card focus:outline-none",
              className,
            )}
```

- **Line 59:34** - `px-6`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              <DialogPrimitive.Title
                id={titleId}
>               className="border-b [px-6] py-4 text-lg font-semibold text-foreground"
              >
                {title}
```

- **Line 59:39** - `py-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              <DialogPrimitive.Title
                id={titleId}
>               className="border-b px-6 [py-4] text-lg font-semibold text-foreground"
              >
                {title}
```

- **Line 64:26** - `p-6`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              </DialogPrimitive.Title>
            )}
>           <div className="[p-6]">
              {description && (
                <DialogPrimitive.Description
```

_... and 4 more violations of this type_

#### numeric-radius (2)

- **Line 51:246** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
            aria-describedby={description ? descriptionId : undefined}
            className={cn(
>             "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 shadow-elevation-xl fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 [rounded-lg] border bg-card focus:outline-none",
              className,
            )}
```

- **Line 78:40** - `rounded-full`
  - Suggestion: Use radius tokens through component token system

```
              <DialogPrimitive.Close
                className={cn(
>                 "absolute right-4 top-4 [rounded-full] p-1 text-muted-foreground transition-colors hover:text-foreground",
                  focusRing,
                )}
```

#### numeric-size (2)

- **Line 82:28** - `h-4`
  - Suggestion: Use size tokens through component token system

```
                )}
              >
>               <X className="[h-4] w-4" aria-hidden="true" />
                <span className="sr-only">Close modal</span>
              </DialogPrimitive.Close>
```

- **Line 82:32** - `w-4`
  - Suggestion: Use size tokens through component token system

```
                )}
              >
>               <X className="h-4 [w-4]" aria-hidden="true" />
                <span className="sr-only">Close modal</span>
              </DialogPrimitive.Close>
```

#### typography-size (2)

- **Line 59:44** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              <DialogPrimitive.Title
                id={titleId}
>               className="border-b px-6 py-4 [text-lg] font-semibold text-foreground"
              >
                {title}
```

- **Line 68:32** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                <DialogPrimitive.Description
                  id={descriptionId}
>                 className="mb-4 [text-sm] text-muted-foreground"
                >
                  {description}
```

#### transition-utility (1)

- **Line 78:79** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
              <DialogPrimitive.Close
                className={cn(
>                 "absolute right-4 top-4 rounded-full p-1 text-muted-foreground [transition-colors] hover:text-foreground",
                  focusRing,
                )}
```

### src/components/navigation/Breadcrumbs.tsx

**Violations:** 9

#### tailwind-text-color (4)

- **Line 35:54** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              <li key={`${item.label}-${index}`} className="flex items-center">
                {index > 0 && (
>                 <ChevronRight className="mx-1 h-4 w-4 [text-muted]-foreground" aria-hidden="true" />
                )}
                {item.href && !isLast ? (
```

- **Line 40:29** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                  <Link
                    href={item.href}
>                   className="[text-muted]-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
```

- **Line 40:75** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                  <Link
                    href={item.href}
>                   className="text-muted-foreground transition-colors hover:[text-foreground]"
                  >
                    {item.label}
```

- **Line 46:41** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                ) : (
                  <span
>                   className="font-medium [text-foreground]"
                    aria-current={isLast ? "page" : undefined}
                  >
```

#### numeric-spacing (1)

- **Line 35:41** - `mx-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
              <li key={`${item.label}-${index}`} className="flex items-center">
                {index > 0 && (
>                 <ChevronRight className="[mx-1] h-4 w-4 text-muted-foreground" aria-hidden="true" />
                )}
                {item.href && !isLast ? (
```

#### numeric-size (2)

- **Line 35:46** - `h-4`
  - Suggestion: Use size tokens through component token system

```
              <li key={`${item.label}-${index}`} className="flex items-center">
                {index > 0 && (
>                 <ChevronRight className="mx-1 [h-4] w-4 text-muted-foreground" aria-hidden="true" />
                )}
                {item.href && !isLast ? (
```

- **Line 35:50** - `w-4`
  - Suggestion: Use size tokens through component token system

```
              <li key={`${item.label}-${index}`} className="flex items-center">
                {index > 0 && (
>                 <ChevronRight className="mx-1 h-4 [w-4] text-muted-foreground" aria-hidden="true" />
                )}
                {item.href && !isLast ? (
```

#### typography-size (1)

- **Line 28:24** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

    return (
>     <nav className={cn("[text-sm]", className)} aria-label={ariaLabel}>
        <ol className="flex items-center space-x-sm">
          {items.map((item, index) => {
```

#### transition-utility (1)

- **Line 40:51** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
                  <Link
                    href={item.href}
>                   className="text-muted-foreground [transition-colors] hover:text-foreground"
                  >
                    {item.label}
```

### src/components/navigation/Pagination.tsx

**Violations:** 15

#### tailwind-bg-color (5)

- **Line 68:36** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```

    const buttonClasses =
>     "rounded-md border border-input [bg-background] px-sm py-sm text-sm transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50";

    return (
```

- **Line 68:94** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```

    const buttonClasses =
>     "rounded-md border border-input bg-background px-sm py-sm text-sm transition-colors hover:[bg-accent] disabled:cursor-not-allowed disabled:opacity-50";

    return (
```

- **Line 98:36** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                  focusRing,
                  page === currentPage
>                   ? "border-primary [bg-primary] text-primary-foreground"
                    : "border-input bg-background hover:bg-accent",
                )}
```

- **Line 99:34** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                  page === currentPage
                    ? "border-primary bg-primary text-primary-foreground"
>                   : "border-input [bg-background] hover:bg-accent",
                )}
                aria-label={`Go to page ${page}`}
```

- **Line 99:54** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                  page === currentPage
                    ? "border-primary bg-primary text-primary-foreground"
>                   : "border-input bg-background hover:[bg-accent]",
                )}
                aria-label={`Go to page ${page}`}
```

#### tailwind-text-color (2)

- **Line 87:41** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <React.Fragment key={`${page}-${index}`}>
            {page === "..." ? (
>             <span className="px-sm py-sm [text-muted]-foreground" aria-hidden="true">
                …
              </span>
```

- **Line 98:47** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                  focusRing,
                  page === currentPage
>                   ? "border-primary bg-primary [text-primary]-foreground"
                    : "border-input bg-background hover:bg-accent",
                )}
```

#### tailwind-border-color (1)

- **Line 98:21** - `border-primary`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
                  focusRing,
                  page === currentPage
>                   ? "[border-primary] bg-primary text-primary-foreground"
                    : "border-input bg-background hover:bg-accent",
                )}
```

#### numeric-radius (1)

- **Line 68:5** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```

    const buttonClasses =
>     "[rounded-md] border border-input bg-background px-sm py-sm text-sm transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50";

    return (
```

#### numeric-size (4)

- **Line 80:32** - `h-4`
  - Suggestion: Use size tokens through component token system

```
          aria-disabled={currentPage === firstPage}
        >
>         <ChevronLeft className="[h-4] w-4" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </button>
```

- **Line 80:36** - `w-4`
  - Suggestion: Use size tokens through component token system

```
          aria-disabled={currentPage === firstPage}
        >
>         <ChevronLeft className="h-4 [w-4]" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </button>
```

- **Line 118:33** - `h-4`
  - Suggestion: Use size tokens through component token system

```
          aria-disabled={currentPage === lastPage}
        >
>         <ChevronRight className="[h-4] w-4" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </button>
```

- **Line 118:37** - `w-4`
  - Suggestion: Use size tokens through component token system

```
          aria-disabled={currentPage === lastPage}
        >
>         <ChevronRight className="h-4 [w-4]" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </button>
```

#### typography-size (1)

- **Line 68:62** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

    const buttonClasses =
>     "rounded-md border border-input bg-background px-sm py-sm [text-sm] transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50";

    return (
```

#### transition-utility (1)

- **Line 68:70** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```

    const buttonClasses =
>     "rounded-md border border-input bg-background px-sm py-sm text-sm [transition-colors] hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50";

    return (
```

### src/components/navigation/breadcrumbs/Breadcrumbs.tsx

**Violations:** 3

#### numeric-spacing (1)

- **Line 169:23** - `mx-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        <span
          ref={ref}
>         className={cn("[mx-1]", NAVIGATION_TOKENS.states.default.text, className)}
          aria-hidden="true"
          {...props}
```

#### numeric-size (2)

- **Line 88:23** - `h-4`
  - Suggestion: Use size tokens through component token system

```
      const defaultSeparator = (
        <ChevronRight
>         className={cn("[h-4] w-4", NAVIGATION_TOKENS.states.default.text)}
          aria-hidden="true"
        />
```

- **Line 88:27** - `w-4`
  - Suggestion: Use size tokens through component token system

```
      const defaultSeparator = (
        <ChevronRight
>         className={cn("h-4 [w-4]", NAVIGATION_TOKENS.states.default.text)}
          aria-hidden="true"
        />
```

### src/components/navigation/pagination/Pagination.tsx

**Violations:** 4

#### numeric-size (4)

- **Line 277:32** - `h-4`
  - Suggestion: Use size tokens through component token system

```
          {...props}
        >
>         <ChevronLeft className="[h-4] w-4" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </button>
```

- **Line 277:36** - `w-4`
  - Suggestion: Use size tokens through component token system

```
          {...props}
        >
>         <ChevronLeft className="h-4 [w-4]" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </button>
```

- **Line 313:33** - `h-4`
  - Suggestion: Use size tokens through component token system

```
          {...props}
        >
>         <ChevronRight className="[h-4] w-4" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </button>
```

- **Line 313:37** - `w-4`
  - Suggestion: Use size tokens through component token system

```
          {...props}
        >
>         <ChevronRight className="h-4 [w-4]" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </button>
```

### src/components/navigation/stepper/Stepper.tsx

**Violations:** 2

#### numeric-size (2)

- **Line 295:28** - `h-4`
  - Suggestion: Use size tokens through component token system

```
            {...props}
          >
>           <Check className="[h-4] w-4" aria-hidden="true" />
          </div>
        );
```

- **Line 295:32** - `w-4`
  - Suggestion: Use size tokens through component token system

```
            {...props}
          >
>           <Check className="h-4 [w-4]" aria-hidden="true" />
          </div>
        );
```

### src/components/navigation/tabs/Tabs.tsx

**Violations:** 2

#### numeric-spacing (1)

- **Line 401:11** - `mt-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          hidden={!isSelected}
          className={cn(
>           "[mt-2]",
            isSelected ? "block" : "hidden",
            NAVIGATION_TOKENS.focus.ring,
```

#### numeric-size (1)

- **Line 195:38** - `w-full`
  - Suggestion: Use size tokens through component token system

```
      return (
        <TabsContext.Provider value={contextValue}>
>         <div ref={ref} className={cn("[w-full]", className)} {...props}>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && child.type === TabsList) {
```

### src/components/notifications/NotificationCenter.GroupHeader.tsx

**Violations:** 8

#### tailwind-text-color (1)

- **Line 62:45** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          {...props}
        >
>         <h3 className="text-sm font-semibold [text-foreground]">{label}</h3>
          {collapsible && onToggleCollapse && (
            <Button
```

#### numeric-size (6)

- **Line 70:23** - `h-6`
  - Suggestion: Use size tokens through component token system

```
              aria-label={collapsed ? "Expand group" : "Collapse group"}
              aria-expanded={!collapsed}
>             className="[h-6] w-6"
            >
              {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
```

- **Line 70:27** - `w-6`
  - Suggestion: Use size tokens through component token system

```
              aria-label={collapsed ? "Expand group" : "Collapse group"}
              aria-expanded={!collapsed}
>             className="h-6 [w-6]"
            >
              {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
```

- **Line 72:49** - `h-4`
  - Suggestion: Use size tokens through component token system

```
              className="h-6 w-6"
            >
>             {collapsed ? <ChevronDown className="[h-4] w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          )}
```

- **Line 72:53** - `w-4`
  - Suggestion: Use size tokens through component token system

```
              className="h-6 w-6"
            >
>             {collapsed ? <ChevronDown className="h-4 [w-4]" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          )}
```

- **Line 72:85** - `h-4`
  - Suggestion: Use size tokens through component token system

```
              className="h-6 w-6"
            >
>             {collapsed ? <ChevronDown className="[h-4] w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          )}
```

_... and 1 more violations of this type_

#### typography-size (1)

- **Line 62:23** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          {...props}
        >
>         <h3 className="[text-sm] font-semibold text-foreground">{label}</h3>
          {collapsible && onToggleCollapse && (
            <Button
```

### src/components/notifications/NotificationCenter.Item.tsx

**Violations:** 18

#### tailwind-bg-color (1)

- **Line 125:43** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            NOTIFICATION_TOKENS.surface[variant],
            !isRead && "ring-1 ring-primary/20",
>           onClick && "cursor-pointer hover:[bg-accent]/50",
            className,
          )}
```

#### tailwind-text-color (5)

- **Line 133:66** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          {/* Icon */}
          <div className="flex-shrink-0">
>           <Icon className={cn(NOTIFICATION_TOKENS.item.iconSize, "[text-foreground]/70")} />
          </div>

```

- **Line 139:63** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <div className="min-w-0 flex-1 space-y-xs">
            {notification.title && (
>             <div id={titleId} className="text-sm font-semibold [text-foreground]">
                {notification.title}
              </div>
```

- **Line 144:55** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            )}
            {notification.description && (
>             <div id={descriptionId} className="text-sm [text-foreground]/80">
                {notification.description}
              </div>
```

- **Line 148:34** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              </div>
            )}
>           <div className="text-xs [text-muted]-foreground">
              {formatRelativeTime(notification.timestamp)}
            </div>
```

- **Line 175:91** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              onClick={handleDismiss}
              aria-label="Dismiss notification"
>             className="absolute right-xs top-xs h-6 w-6 opacity-0 transition-opacity hover:[text-foreground] focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
```

#### numeric-radius (1)

- **Line 119:50** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
          aria-describedby={notification.description ? descriptionId : undefined}
          className={cn(
>           "group relative flex items-start gap-sm [rounded-md] border transition-colors",
            NOTIFICATION_TOKENS.item.padding,
            NOTIFICATION_TOKENS.item.radius,
```

#### numeric-size (5)

- **Line 137:24** - `min-w-0`
  - Suggestion: Use size tokens through component token system

```

          {/* Content */}
>         <div className="[min-w-0] flex-1 space-y-xs">
            {notification.title && (
              <div id={titleId} className="text-sm font-semibold text-foreground">
```

- **Line 175:48** - `h-6`
  - Suggestion: Use size tokens through component token system

```
              onClick={handleDismiss}
              aria-label="Dismiss notification"
>             className="absolute right-xs top-xs [h-6] w-6 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
```

- **Line 175:52** - `w-6`
  - Suggestion: Use size tokens through component token system

```
              onClick={handleDismiss}
              aria-label="Dismiss notification"
>             className="absolute right-xs top-xs h-6 [w-6] opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
```

- **Line 177:26** - `h-4`
  - Suggestion: Use size tokens through component token system

```
              className="absolute right-xs top-xs h-6 w-6 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
            >
>             <X className="[h-4] w-4" />
            </Button>
          )}
```

- **Line 177:30** - `w-4`
  - Suggestion: Use size tokens through component token system

```
              className="absolute right-xs top-xs h-6 w-6 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
            >
>             <X className="h-4 [w-4]" />
            </Button>
          )}
```

#### typography-size (4)

- **Line 139:41** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <div className="min-w-0 flex-1 space-y-xs">
            {notification.title && (
>             <div id={titleId} className="[text-sm] font-semibold text-foreground">
                {notification.title}
              </div>
```

- **Line 144:47** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            )}
            {notification.description && (
>             <div id={descriptionId} className="[text-sm] text-foreground/80">
                {notification.description}
              </div>
```

- **Line 148:26** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
              </div>
            )}
>           <div className="[text-xs] text-muted-foreground">
              {formatRelativeTime(notification.timestamp)}
            </div>
```

- **Line 160:37** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                    notification.action?.onClick();
                  }}
>                 className="h-7 px-xs [text-xs]"
                >
                  {notification.action.label}
```

#### transition-utility (2)

- **Line 119:68** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
          aria-describedby={notification.description ? descriptionId : undefined}
          className={cn(
>           "group relative flex items-start gap-sm rounded-md border [transition-colors]",
            NOTIFICATION_TOKENS.item.padding,
            NOTIFICATION_TOKENS.item.radius,
```

- **Line 175:66** - `transition-opacity`
  - Suggestion: Use MOTION_TOKENS for transitions

```
              onClick={handleDismiss}
              aria-label="Dismiss notification"
>             className="absolute right-xs top-xs h-6 w-6 opacity-0 [transition-opacity] hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
```

### src/components/notifications/NotificationCenter.Panel.tsx

**Violations:** 11

#### tailwind-text-color (1)

- **Line 248:72** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
              >
                {Object.keys(grouped).length === 0 ? (
>                 <div className="flex h-full items-center justify-center [text-muted]-foreground">
                    No notifications
                  </div>
```

#### numeric-spacing (2)

- **Line 206:19** - `right-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            }}
            className={cn(
>             "fixed [right-0] top-0 z-50 h-full",
              NOTIFICATION_TOKENS.panel.width[width],
              NOTIFICATION_TOKENS.panel.maxHeight,
```

- **Line 206:27** - `top-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
            }}
            className={cn(
>             "fixed right-0 [top-0] z-50 h-full",
              NOTIFICATION_TOKENS.panel.width[width],
              NOTIFICATION_TOKENS.panel.maxHeight,
```

#### numeric-size (7)

- **Line 206:38** - `h-full`
  - Suggestion: Use size tokens through component token system

```
            }}
            className={cn(
>             "fixed right-0 top-0 z-50 [h-full]",
              NOTIFICATION_TOKENS.panel.width[width],
              NOTIFICATION_TOKENS.panel.maxHeight,
```

- **Line 219:32** - `h-full`
  - Suggestion: Use size tokens through component token system

```
              ref={ref}
              variant="raised"
>             className={cn("flex [h-full] flex-col", NOTIFICATION_TOKENS.panel.radius.default)}
            >
              {/* Header */}
```

- **Line 236:29** - `h-8`
  - Suggestion: Use size tokens through component token system

```
                    onClick={onClose}
                    aria-label="Close notifications"
>                   className="[h-8] w-8"
                  >
                    <X className="h-4 w-4" />
```

- **Line 236:33** - `w-8`
  - Suggestion: Use size tokens through component token system

```
                    onClick={onClose}
                    aria-label="Close notifications"
>                   className="h-8 [w-8]"
                  >
                    <X className="h-4 w-4" />
```

- **Line 238:32** - `h-4`
  - Suggestion: Use size tokens through component token system

```
                    className="h-8 w-8"
                  >
>                   <X className="[h-4] w-4" />
                  </Button>
                </div>
```

_... and 2 more violations of this type_

#### typography-size (1)

- **Line 228:29** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                )}
              >
>               <h2 className="[text-lg] font-semibold">Notifications</h2>
                <div className="flex items-center gap-xs">
                  <NotificationCenterDismissAll />
```

### src/components/notifications/NotificationCenter.Trigger.tsx

**Violations:** 10

#### tailwind-bg-color (1)

- **Line 55:92** - `bg-destructive`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          <span
            className={cn(
>             "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full [bg-destructive] text-xs font-semibold text-destructive-foreground",
            )}
            aria-hidden="true"
```

#### tailwind-text-color (1)

- **Line 55:129** - `text-destructive`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          <span
            className={cn(
>             "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-semibold [text-destructive]-foreground",
            )}
            aria-hidden="true"
```

#### numeric-spacing (2)

- **Line 55:23** - `right-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <span
            className={cn(
>             "absolute -[right-1] -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-semibold text-destructive-foreground",
            )}
            aria-hidden="true"
```

- **Line 55:32** - `top-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          <span
            className={cn(
>             "absolute -right-1 -[top-1] flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-semibold text-destructive-foreground",
            )}
            aria-hidden="true"
```

#### numeric-radius (1)

- **Line 55:79** - `rounded-full`
  - Suggestion: Use radius tokens through component token system

```
          <span
            className={cn(
>             "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center [rounded-full] bg-destructive text-xs font-semibold text-destructive-foreground",
            )}
            aria-hidden="true"
```

#### numeric-size (4)

- **Line 51:23** - `h-5`
  - Suggestion: Use size tokens through component token system

```
        {...props}
      >
>       <Bell className="[h-5] w-5" />
        {showBadge && unreadCount > 0 && (
          <span
```

- **Line 51:27** - `w-5`
  - Suggestion: Use size tokens through component token system

```
        {...props}
      >
>       <Bell className="h-5 [w-5]" />
        {showBadge && unreadCount > 0 && (
          <span
```

- **Line 55:43** - `h-5`
  - Suggestion: Use size tokens through component token system

```
          <span
            className={cn(
>             "absolute -right-1 -top-1 flex [h-5] w-5 items-center justify-center rounded-full bg-destructive text-xs font-semibold text-destructive-foreground",
            )}
            aria-hidden="true"
```

- **Line 55:47** - `w-5`
  - Suggestion: Use size tokens through component token system

```
          <span
            className={cn(
>             "absolute -right-1 -top-1 flex h-5 [w-5] items-center justify-center rounded-full bg-destructive text-xs font-semibold text-destructive-foreground",
            )}
            aria-hidden="true"
```

#### typography-size (1)

- **Line 55:107** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          <span
            className={cn(
>             "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive [text-xs] font-semibold text-destructive-foreground",
            )}
            aria-hidden="true"
```

### src/components/primitives/Badge.tsx

**Violations:** 20

#### tailwind-bg-color (9)

- **Line 13:37** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      variants: {
        variant: {
>         primary: "border-transparent [bg-primary] text-primary-foreground hover:bg-primary/80",
          secondary:
            "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
```

- **Line 13:78** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      variants: {
        variant: {
>         primary: "border-transparent [bg-primary] text-primary-foreground hover:bg-primary/80",
          secondary:
            "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
```

- **Line 15:30** - `bg-secondary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          primary: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
          secondary:
>           "border-transparent [bg-secondary] text-secondary-foreground hover:bg-secondary/80",
          accent: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
          outline: "text-foreground border-border",
```

- **Line 15:75** - `bg-secondary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          primary: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
          secondary:
>           "border-transparent [bg-secondary] text-secondary-foreground hover:bg-secondary/80",
          accent: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
          outline: "text-foreground border-border",
```

- **Line 16:36** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          secondary:
            "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
>         accent: "border-transparent [bg-accent] text-accent-foreground hover:bg-accent/80",
          outline: "text-foreground border-border",
          ghost: "border-transparent bg-transparent text-foreground hover:bg-accent/10",
```

_... and 4 more violations of this type_

#### tailwind-text-color (8)

- **Line 13:48** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      variants: {
        variant: {
>         primary: "border-transparent bg-primary [text-primary]-foreground hover:bg-primary/80",
          secondary:
            "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
```

- **Line 15:43** - `text-secondary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          primary: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
          secondary:
>           "border-transparent bg-secondary [text-secondary]-foreground hover:bg-secondary/80",
          accent: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
          outline: "text-foreground border-border",
```

- **Line 16:46** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          secondary:
            "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
>         accent: "border-transparent bg-accent [text-accent]-foreground hover:bg-accent/80",
          outline: "text-foreground border-border",
          ghost: "border-transparent bg-transparent text-foreground hover:bg-accent/10",
```

- **Line 17:18** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
          accent: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
>         outline: "[text-foreground] border-border",
          ghost: "border-transparent bg-transparent text-foreground hover:bg-accent/10",
          link: "border-transparent bg-transparent text-primary hover:text-primary/80 underline-offset-4 hover:underline",
```

- **Line 18:50** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          accent: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
          outline: "text-foreground border-border",
>         ghost: "border-transparent bg-transparent [text-foreground] hover:bg-accent/10",
          link: "border-transparent bg-transparent text-primary hover:text-primary/80 underline-offset-4 hover:underline",
          destructive:
```

_... and 3 more violations of this type_

#### numeric-radius (1)

- **Line 9:28** - `rounded-full`
  - Suggestion: Use radius tokens through component token system

```

  const badgeVariants = cva(
>   "inline-flex items-center [rounded-full] border px-xs py-xs text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
      variants: {
```

#### typography-size (1)

- **Line 9:60** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

  const badgeVariants = cva(
>   "inline-flex items-center rounded-full border px-xs py-xs [text-xs] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
      variants: {
```

#### transition-utility (1)

- **Line 9:82** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```

  const badgeVariants = cva(
>   "inline-flex items-center rounded-full border px-xs py-xs text-xs font-semibold [transition-colors] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
      variants: {
```

### src/components/primitives/Divider.tsx

**Violations:** 2

#### numeric-size (2)

- **Line 13:36** - `h-full`
  - Suggestion: Use size tokens through component token system

```
  }

> // Full height token (equivalent to [h-full])
  const FULL_HEIGHT = "h-full";

```

- **Line 14:21** - `h-full`
  - Suggestion: Use size tokens through component token system

```

  // Full height token (equivalent to h-full)
> const FULL_HEIGHT = "[h-full]";

  const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
```

### src/components/primitives/Link.tsx

**Violations:** 25

#### tailwind-bg-color (3)

- **Line 19:31** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            "text-accent-foreground hover:text-accent-foreground/80 underline-offset-4 hover:underline",
          outline:
>           "border border-input [bg-background] hover:bg-accent hover:text-accent-foreground rounded-md px-md py-sm",
          ghost:
            "text-foreground hover:text-accent-foreground hover:bg-accent rounded-md px-sm py-sm",
```

- **Line 19:51** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            "text-accent-foreground hover:text-accent-foreground/80 underline-offset-4 hover:underline",
          outline:
>           "border border-input bg-background hover:[bg-accent] hover:text-accent-foreground rounded-md px-md py-sm",
          ghost:
            "text-foreground hover:text-accent-foreground hover:bg-accent rounded-md px-sm py-sm",
```

- **Line 21:62** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-md py-sm",
          ghost:
>           "text-foreground hover:text-accent-foreground hover:[bg-accent] rounded-md px-sm py-sm",
          link: "text-primary underline-offset-4 hover:underline",
          destructive:
```

#### tailwind-text-color (11)

- **Line 14:18** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      variants: {
        variant: {
>         primary: "[text-primary] hover:text-primary/80 underline-offset-4 hover:underline",
          secondary: "text-secondary-foreground underline-offset-4 hover:underline",
          accent:
```

- **Line 14:37** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      variants: {
        variant: {
>         primary: "[text-primary] hover:text-primary/80 underline-offset-4 hover:underline",
          secondary: "text-secondary-foreground underline-offset-4 hover:underline",
          accent:
```

- **Line 15:20** - `text-secondary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        variant: {
          primary: "text-primary hover:text-primary/80 underline-offset-4 hover:underline",
>         secondary: "[text-secondary]-foreground underline-offset-4 hover:underline",
          accent:
            "text-accent-foreground hover:text-accent-foreground/80 underline-offset-4 hover:underline",
```

- **Line 17:11** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          secondary: "text-secondary-foreground underline-offset-4 hover:underline",
          accent:
>           "[text-accent]-foreground hover:text-accent-foreground/80 underline-offset-4 hover:underline",
          outline:
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-md py-sm",
```

- **Line 17:40** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          secondary: "text-secondary-foreground underline-offset-4 hover:underline",
          accent:
>           "[text-accent]-foreground hover:text-accent-foreground/80 underline-offset-4 hover:underline",
          outline:
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-md py-sm",
```

_... and 6 more violations of this type_

#### numeric-radius (2)

- **Line 19:90** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
            "text-accent-foreground hover:text-accent-foreground/80 underline-offset-4 hover:underline",
          outline:
>           "border border-input bg-background hover:bg-accent hover:text-accent-foreground [rounded-md] px-md py-sm",
          ghost:
            "text-foreground hover:text-accent-foreground hover:bg-accent rounded-md px-sm py-sm",
```

- **Line 21:72** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-md py-sm",
          ghost:
>           "text-foreground hover:text-accent-foreground hover:bg-accent [rounded-md] px-sm py-sm",
          link: "text-primary underline-offset-4 hover:underline",
          destructive:
```

#### numeric-size (2)

- **Line 28:13** - `h-8`
  - Suggestion: Use size tokens through component token system

```
        size: {
          xs: "h-7 text-xs px-xs py-xs",
>         sm: "[h-8] text-xs px-sm py-xs",
          md: "h-9 text-sm px-md py-sm",
          lg: "h-10 text-sm px-lg py-sm",
```

- **Line 30:13** - `h-10`
  - Suggestion: Use size tokens through component token system

```
          sm: "h-8 text-xs px-sm py-xs",
          md: "h-9 text-sm px-md py-sm",
>         lg: "[h-10] text-sm px-lg py-sm",
          xl: "h-11 text-base px-xl py-md",
        },
```

#### typography-size (6)

- **Line 10:61** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

  const linkVariants = cva(
>   "inline-flex items-center justify-center whitespace-nowrap [text-sm] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
```

- **Line 27:17** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        },
        size: {
>         xs: "h-7 [text-xs] px-xs py-xs",
          sm: "h-8 text-xs px-sm py-xs",
          md: "h-9 text-sm px-md py-sm",
```

- **Line 28:17** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        size: {
          xs: "h-7 text-xs px-xs py-xs",
>         sm: "h-8 [text-xs] px-sm py-xs",
          md: "h-9 text-sm px-md py-sm",
          lg: "h-10 text-sm px-lg py-sm",
```

- **Line 29:17** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          xs: "h-7 text-xs px-xs py-xs",
          sm: "h-8 text-xs px-sm py-xs",
>         md: "h-9 [text-sm] px-md py-sm",
          lg: "h-10 text-sm px-lg py-sm",
          xl: "h-11 text-base px-xl py-md",
```

- **Line 30:18** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          sm: "h-8 text-xs px-sm py-xs",
          md: "h-9 text-sm px-md py-sm",
>         lg: "h-10 [text-sm] px-lg py-sm",
          xl: "h-11 text-base px-xl py-md",
        },
```

_... and 1 more violations of this type_

#### transition-utility (1)

- **Line 10:81** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```

  const linkVariants = cva(
>   "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium [transition-colors] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
```

### src/components/primitives/ThemeSwitch.tsx

**Violations:** 4

#### numeric-size (4)

- **Line 178:42** - `h-4`
  - Suggestion: Use size tokens through component token system

```
        type="button"
      >
>       {mode === "night" ? <Sun className="[h-4] w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    );
```

- **Line 178:46** - `w-4`
  - Suggestion: Use size tokens through component token system

```
        type="button"
      >
>       {mode === "night" ? <Sun className="h-4 [w-4]" /> : <Moon className="h-4 w-4" />}
      </Button>
    );
```

- **Line 178:73** - `h-4`
  - Suggestion: Use size tokens through component token system

```
        type="button"
      >
>       {mode === "night" ? <Sun className="[h-4] w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    );
```

- **Line 178:77** - `w-4`
  - Suggestion: Use size tokens through component token system

```
        type="button"
      >
>       {mode === "night" ? <Sun className="h-4 [w-4]" /> : <Moon className="h-4 w-4" />}
      </Button>
    );
```

### src/components/search/SearchBar.tsx

**Violations:** 11

#### tailwind-bg-color (2)

- **Line 121:91** - `bg-popover`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        />
        {isFocused && filteredSuggestions.length > 0 && (
>         <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border [bg-popover] shadow-lg">
            {filteredSuggestions.map((suggestion, index) => (
              <Button
```

- **Line 130:44** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                className={cn(
                  "w-full justify-start px-md py-sm text-sm",
>                 index === selectedIndex && "[bg-accent] text-accent-foreground",
                )}
              >
```

#### tailwind-text-color (1)

- **Line 130:54** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                className={cn(
                  "w-full justify-start px-md py-sm text-sm",
>                 index === selectedIndex && "bg-accent [text-accent]-foreground",
                )}
              >
```

#### tailwind-border-color (2)

- **Line 116:17** - `border-primary`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
            "transition-[border-color,box-shadow] duration-fast",
            "focus:ring-2 focus:ring-primary focus:ring-offset-2",
>           "hover:[border-primary]/50",
            isFocused && "border-primary shadow-sm",
          )}
```

- **Line 117:24** - `border-primary`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
            "focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "hover:border-primary/50",
>           isFocused && "[border-primary] shadow-sm",
          )}
        />
```

#### numeric-spacing (1)

- **Line 121:38** - `mt-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        />
        {isFocused && filteredSuggestions.length > 0 && (
>         <div className="absolute z-50 [mt-1] max-h-60 w-full overflow-auto rounded-md border bg-popover shadow-lg">
            {filteredSuggestions.map((suggestion, index) => (
              <Button
```

#### numeric-radius (1)

- **Line 121:73** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
        />
        {isFocused && filteredSuggestions.length > 0 && (
>         <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto [rounded-md] border bg-popover shadow-lg">
            {filteredSuggestions.map((suggestion, index) => (
              <Button
```

#### numeric-size (3)

- **Line 105:49** - `w-full`
  - Suggestion: Use size tokens through component token system

```

    return (
>     <div ref={searchRef} className={cn("relative [w-full] max-w-sm", className)}>
        <SearchInput
          placeholder={placeholder}
```

- **Line 121:52** - `w-full`
  - Suggestion: Use size tokens through component token system

```
        />
        {isFocused && filteredSuggestions.length > 0 && (
>         <div className="absolute z-50 mt-1 max-h-60 [w-full] overflow-auto rounded-md border bg-popover shadow-lg">
            {filteredSuggestions.map((suggestion, index) => (
              <Button
```

- **Line 129:17** - `w-full`
  - Suggestion: Use size tokens through component token system

```
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
>                 "[w-full] justify-start px-md py-sm text-sm",
                  index === selectedIndex && "bg-accent text-accent-foreground",
                )}
```

#### typography-size (1)

- **Line 129:50** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
>                 "w-full justify-start px-md py-sm [text-sm]",
                  index === selectedIndex && "bg-accent text-accent-foreground",
                )}
```

### src/components/sections/ArticlesSection.tsx

**Violations:** 6

#### tailwind-bg-color (1)

- **Line 51:75** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          >
            {article.imageUrl && (
>             <div className="mb-md h-[var(--spacing-3xl)] w-full rounded-md [bg-muted]" />
            )}
            <div className="space-y-sm">
```

#### tailwind-text-color (1)

- **Line 55:73** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
            <div className="space-y-sm">
              <Heading level={2} className="text-xl font-semibold">
>               <Link href={article.href} variant="ghost" className="hover:[text-primary]">
                  {article.title}
                </Link>
```

#### numeric-radius (2)

- **Line 48:21** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
          <article
            key={article.href || index}
>           className="[rounded-lg] border p-lg transition-shadow hover:shadow-md"
          >
            {article.imageUrl && (
```

- **Line 51:64** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
          >
            {article.imageUrl && (
>             <div className="mb-md h-[var(--spacing-3xl)] w-full [rounded-md] bg-muted" />
            )}
            <div className="space-y-sm">
```

#### numeric-size (1)

- **Line 51:57** - `w-full`
  - Suggestion: Use size tokens through component token system

```
          >
            {article.imageUrl && (
>             <div className="mb-md h-[var(--spacing-3xl)] [w-full] rounded-md bg-muted" />
            )}
            <div className="space-y-sm">
```

#### typography-size (1)

- **Line 54:42** - `text-xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            )}
            <div className="space-y-sm">
>             <Heading level={2} className="[text-xl] font-semibold">
                <Link href={article.href} variant="ghost" className="hover:text-primary">
                  {article.title}
```

### src/components/sections/CTASection.tsx

**Violations:** 7

#### tailwind-bg-color (1)

- **Line 82:28** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
    return (
      <section
>       className={cn("w-full [bg-muted] py-xl transition-colors", className)}
        aria-label="Call to action section"
      >
```

#### numeric-size (1)

- **Line 82:21** - `w-full`
  - Suggestion: Use size tokens through component token system

```
    return (
      <section
>       className={cn("[w-full] bg-muted py-xl transition-colors", className)}
        aria-label="Call to action section"
      >
```

#### typography-size (4)

- **Line 99:30** - `text-3xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                className={cn(
                  "font-bold tracking-tight",
>                 isCentered ? "[text-3xl] md:text-4xl" : "text-2xl md:text-3xl",
                )}
              >
```

- **Line 99:42** - `text-4xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                className={cn(
                  "font-bold tracking-tight",
>                 isCentered ? "text-3xl md:[text-4xl]" : "text-2xl md:text-3xl",
                )}
              >
```

- **Line 99:55** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                className={cn(
                  "font-bold tracking-tight",
>                 isCentered ? "text-3xl md:text-4xl" : "[text-2xl] md:text-3xl",
                )}
              >
```

- **Line 99:67** - `text-3xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                className={cn(
                  "font-bold tracking-tight",
>                 isCentered ? "[text-3xl] md:text-4xl" : "text-2xl md:text-3xl",
                )}
              >
```

#### transition-utility (1)

- **Line 82:43** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
    return (
      <section
>       className={cn("w-full bg-muted py-xl [transition-colors]", className)}
        aria-label="Call to action section"
      >
```

### src/components/sections/FeatureSection.tsx

**Violations:** 7

#### tailwind-bg-color (1)

- **Line 85:88** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
                  <div className="space-y-md">
                    {/* Icon */}
>                   <div className="flex h-12 w-12 items-center justify-center rounded-lg [bg-primary]/10 text-primary">
                      {feature.icon}
                    </div>
```

#### tailwind-text-color (1)

- **Line 85:102** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
                  <div className="space-y-md">
                    {/* Icon */}
>                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 [text-primary]">
                      {feature.icon}
                    </div>
```

#### numeric-radius (1)

- **Line 85:77** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
                  <div className="space-y-md">
                    {/* Icon */}
>                   <div className="flex h-12 w-12 items-center justify-center [rounded-lg] bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
```

#### numeric-size (3)

- **Line 62:28** - `w-full`
  - Suggestion: Use size tokens through component token system

```

    return (
>     <section className={cn("[w-full] py-xl", className)} aria-label="Features section">
        <div className="container mx-auto px-lg">
          {(title || description) && (
```

- **Line 85:39** - `h-12`
  - Suggestion: Use size tokens through component token system

```
                  <div className="space-y-md">
                    {/* Icon */}
>                   <div className="flex [h-12] w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
```

- **Line 85:44** - `w-12`
  - Suggestion: Use size tokens through component token system

```
                  <div className="space-y-md">
                    {/* Icon */}
>                   <div className="flex h-12 [w-12] items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
```

#### typography-size (1)

- **Line 90:48** - `text-xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```

                    {/* Title */}
>                   <Heading level={3} className="[text-xl] font-semibold">
                      {feature.title}
                    </Heading>
```

### src/components/sections/HeroSection.tsx

**Violations:** 14

#### tailwind-bg-color (3)

- **Line 45:14** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
  }) => {
    const backgroundClasses = {
>     default: "[bg-background]",
      muted: "bg-muted",
      card: "bg-card",
```

- **Line 46:12** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
    const backgroundClasses = {
      default: "bg-background",
>     muted: "[bg-muted]",
      card: "bg-card",
    };
```

- **Line 47:11** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      default: "bg-background",
      muted: "bg-muted",
>     card: "[bg-card]",
    };

```

#### numeric-radius (1)

- **Line 105:62** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
              )}
            >
>             <div className="w-full max-w-full overflow-hidden [rounded-lg]">{media}</div>
            </div>
          )}
```

#### numeric-size (3)

- **Line 54:21** - `w-full`
  - Suggestion: Use size tokens through component token system

```
    return (
      <section
>       className={cn("[w-full] transition-colors", backgroundClasses[background], className)}
        aria-label="Hero section"
      >
```

- **Line 105:28** - `w-full`
  - Suggestion: Use size tokens through component token system

```
              )}
            >
>             <div className="[w-full] max-w-full overflow-hidden rounded-lg">{media}</div>
            </div>
          )}
```

- **Line 105:35** - `max-w-full`
  - Suggestion: Use size tokens through component token system

```
              )}
            >
>             <div className="w-full [max-w-full] overflow-hidden rounded-lg">{media}</div>
            </div>
          )}
```

#### typography-size (6)

- **Line 72:27** - `text-3xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                className={cn(
                  "font-bold tracking-tight",
>                 isSplit ? "[text-3xl] md:text-4xl lg:text-5xl" : "text-4xl md:text-5xl lg:text-6xl",
                )}
              >
```

- **Line 72:39** - `text-4xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                className={cn(
                  "font-bold tracking-tight",
>                 isSplit ? "text-3xl md:[text-4xl] lg:text-5xl" : "text-4xl md:text-5xl lg:text-6xl",
                )}
              >
```

- **Line 72:51** - `text-5xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                className={cn(
                  "font-bold tracking-tight",
>                 isSplit ? "text-3xl md:text-4xl lg:[text-5xl]" : "text-4xl md:text-5xl lg:text-6xl",
                )}
              >
```

- **Line 72:64** - `text-4xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                className={cn(
                  "font-bold tracking-tight",
>                 isSplit ? "text-3xl md:[text-4xl] lg:text-5xl" : "text-4xl md:text-5xl lg:text-6xl",
                )}
              >
```

- **Line 72:76** - `text-5xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                className={cn(
                  "font-bold tracking-tight",
>                 isSplit ? "text-3xl md:text-4xl lg:[text-5xl]" : "text-4xl md:text-5xl lg:text-6xl",
                )}
              >
```

_... and 1 more violations of this type_

#### transition-utility (1)

- **Line 54:28** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
    return (
      <section
>       className={cn("w-full [transition-colors]", backgroundClasses[background], className)}
        aria-label="Hero section"
      >
```

### src/components/toasts/Toast.tsx

**Violations:** 52

#### tailwind-bg-color (9)

- **Line 17:25** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      variants: {
        type: {
>         default: "border [bg-background] text-foreground",
          // Map semantic variants to canonical variants
          success: "border-accent/20 bg-accent/10 text-accent-foreground",
```

- **Line 19:35** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          default: "border bg-background text-foreground",
          // Map semantic variants to canonical variants
>         success: "border-accent/20 [bg-accent]/10 text-accent-foreground",
          error: "border-destructive/20 bg-destructive/10 text-destructive-foreground",
          warning: "border-secondary/20 bg-secondary/10 text-secondary-foreground",
```

- **Line 20:38** - `bg-destructive`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          // Map semantic variants to canonical variants
          success: "border-accent/20 bg-accent/10 text-accent-foreground",
>         error: "border-destructive/20 [bg-destructive]/10 text-destructive-foreground",
          warning: "border-secondary/20 bg-secondary/10 text-secondary-foreground",
          info: "border-primary/20 bg-primary/10 text-primary-foreground",
```

- **Line 21:38** - `bg-secondary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          success: "border-accent/20 bg-accent/10 text-accent-foreground",
          error: "border-destructive/20 bg-destructive/10 text-destructive-foreground",
>         warning: "border-secondary/20 [bg-secondary]/10 text-secondary-foreground",
          info: "border-primary/20 bg-primary/10 text-primary-foreground",
          // Canonical variants (for future use)
```

- **Line 22:33** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          error: "border-destructive/20 bg-destructive/10 text-destructive-foreground",
          warning: "border-secondary/20 bg-secondary/10 text-secondary-foreground",
>         info: "border-primary/20 [bg-primary]/10 text-primary-foreground",
          // Canonical variants (for future use)
          primary: "border-primary/20 bg-primary/10 text-primary-foreground",
```

_... and 4 more violations of this type_

#### tailwind-text-color (20)

- **Line 17:39** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      variants: {
        type: {
>         default: "border bg-background [text-foreground]",
          // Map semantic variants to canonical variants
          success: "border-accent/20 bg-accent/10 text-accent-foreground",
```

- **Line 19:48** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          default: "border bg-background text-foreground",
          // Map semantic variants to canonical variants
>         success: "border-accent/20 bg-accent/10 [text-accent]-foreground",
          error: "border-destructive/20 bg-destructive/10 text-destructive-foreground",
          warning: "border-secondary/20 bg-secondary/10 text-secondary-foreground",
```

- **Line 20:56** - `text-destructive`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          // Map semantic variants to canonical variants
          success: "border-accent/20 bg-accent/10 text-accent-foreground",
>         error: "border-destructive/20 bg-destructive/10 [text-destructive]-foreground",
          warning: "border-secondary/20 bg-secondary/10 text-secondary-foreground",
          info: "border-primary/20 bg-primary/10 text-primary-foreground",
```

- **Line 21:54** - `text-secondary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          success: "border-accent/20 bg-accent/10 text-accent-foreground",
          error: "border-destructive/20 bg-destructive/10 text-destructive-foreground",
>         warning: "border-secondary/20 bg-secondary/10 [text-secondary]-foreground",
          info: "border-primary/20 bg-primary/10 text-primary-foreground",
          // Canonical variants (for future use)
```

- **Line 22:47** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          error: "border-destructive/20 bg-destructive/10 text-destructive-foreground",
          warning: "border-secondary/20 bg-secondary/10 text-secondary-foreground",
>         info: "border-primary/20 bg-primary/10 [text-primary]-foreground",
          // Canonical variants (for future use)
          primary: "border-primary/20 bg-primary/10 text-primary-foreground",
```

_... and 15 more violations of this type_

#### tailwind-border-color (8)

- **Line 19:18** - `border-accent`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
          default: "border bg-background text-foreground",
          // Map semantic variants to canonical variants
>         success: "[border-accent]/20 bg-accent/10 text-accent-foreground",
          error: "border-destructive/20 bg-destructive/10 text-destructive-foreground",
          warning: "border-secondary/20 bg-secondary/10 text-secondary-foreground",
```

- **Line 20:16** - `border-destructive`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
          // Map semantic variants to canonical variants
          success: "border-accent/20 bg-accent/10 text-accent-foreground",
>         error: "[border-destructive]/20 bg-destructive/10 text-destructive-foreground",
          warning: "border-secondary/20 bg-secondary/10 text-secondary-foreground",
          info: "border-primary/20 bg-primary/10 text-primary-foreground",
```

- **Line 21:18** - `border-secondary`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
          success: "border-accent/20 bg-accent/10 text-accent-foreground",
          error: "border-destructive/20 bg-destructive/10 text-destructive-foreground",
>         warning: "[border-secondary]/20 bg-secondary/10 text-secondary-foreground",
          info: "border-primary/20 bg-primary/10 text-primary-foreground",
          // Canonical variants (for future use)
```

- **Line 22:15** - `border-primary`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
          error: "border-destructive/20 bg-destructive/10 text-destructive-foreground",
          warning: "border-secondary/20 bg-secondary/10 text-secondary-foreground",
>         info: "[border-primary]/20 bg-primary/10 text-primary-foreground",
          // Canonical variants (for future use)
          primary: "border-primary/20 bg-primary/10 text-primary-foreground",
```

- **Line 24:18** - `border-primary`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
          info: "border-primary/20 bg-primary/10 text-primary-foreground",
          // Canonical variants (for future use)
>         primary: "[border-primary]/20 bg-primary/10 text-primary-foreground",
          accent: "border-accent/20 bg-accent/10 text-accent-foreground",
          destructive: "border-destructive/20 bg-destructive/10 text-destructive-foreground",
```

_... and 3 more violations of this type_

#### numeric-radius (2)

- **Line 13:106** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
  // Enhanced toast variants using shadcn/ui patterns with Tenerife branding
  const toastVariants = cva(
>   "group pointer-events-auto relative flex w-full items-center justify-between space-x-sm overflow-hidden [rounded-md] border p-md pr-lg shadow-lg transition-[transform,border-color,box-shadow] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
    {
      variants: {
```

- **Line 111:54** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
            variant="ghost"
            size="icon"
>           className="absolute right-xs top-xs h-6 w-6 [rounded-md] p-xs text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
            onClick={() => onDismiss(toast.id)}
          >
```

#### numeric-size (8)

- **Line 13:43** - `w-full`
  - Suggestion: Use size tokens through component token system

```
  // Enhanced toast variants using shadcn/ui patterns with Tenerife branding
  const toastVariants = cva(
>   "group pointer-events-auto relative flex [w-full] items-center justify-between space-x-sm overflow-hidden rounded-md border p-md pr-lg shadow-lg transition-[transform,border-color,box-shadow] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
    {
      variants: {
```

- **Line 36:31** - `h-4`
  - Suggestion: Use size tokens through component token system

```
  );

> const toastIconVariants = cva("[h-4] w-4 flex-shrink-0", {
    variants: {
      type: {
```

- **Line 36:35** - `w-4`
  - Suggestion: Use size tokens through component token system

```
  );

> const toastIconVariants = cva("h-4 [w-4] flex-shrink-0", {
    variants: {
      type: {
```

- **Line 100:29** - `h-8`
  - Suggestion: Use size tokens through component token system

```
                    size="sm"
                    onClick={toast.action.onClick}
>                   className="[h-8] px-xs text-xs"
                  >
                    {toast.action.label}
```

- **Line 111:46** - `h-6`
  - Suggestion: Use size tokens through component token system

```
            variant="ghost"
            size="icon"
>           className="absolute right-xs top-xs [h-6] w-6 rounded-md p-xs text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
            onClick={() => onDismiss(toast.id)}
          >
```

_... and 3 more violations of this type_

#### typography-size (3)

- **Line 92:44** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <Icon className={cn(toastIconVariants({ type: toast.type }))} />
            <div className="flex-1 space-y-xs">
>             {toast.title && <div className="[text-sm] font-semibold">{toast.title}</div>}
              {toast.description && <div className="text-sm opacity-90">{toast.description}</div>}
              {toast.action && (
```

- **Line 93:50** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
            <div className="flex-1 space-y-xs">
              {toast.title && <div className="text-sm font-semibold">{toast.title}</div>}
>             {toast.description && <div className="[text-sm] opacity-90">{toast.description}</div>}
              {toast.action && (
                <div className="mt-sm">
```

- **Line 100:39** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
                    size="sm"
                    onClick={toast.action.onClick}
>                   className="h-8 px-xs [text-xs]"
                  >
                    {toast.action.label}
```

#### transition-utility (2)

- **Line 13:370** - `transition-none`
  - Suggestion: Use MOTION_TOKENS for transitions

```
  // Enhanced toast variants using shadcn/ui patterns with Tenerife branding
  const toastVariants = cva(
>   "group pointer-events-auto relative flex w-full items-center justify-between space-x-sm overflow-hidden rounded-md border p-md pr-lg shadow-lg transition-[transform,border-color,box-shadow] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:[transition-none]",
    {
      variants: {
```

- **Line 111:99** - `transition-opacity`
  - Suggestion: Use MOTION_TOKENS for transitions

```
            variant="ghost"
            size="icon"
>           className="absolute right-xs top-xs h-6 w-6 rounded-md p-xs text-foreground/50 opacity-0 [transition-opacity] hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
            onClick={() => onDismiss(toast.id)}
          >
```

### src/components/toasts/ToastProvider.tsx

**Violations:** 16

#### numeric-spacing (14)

- **Line 43:17** - `top-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```

    const positionClasses = {
>     "top-left": "[top-4] left-4",
      "top-center": "top-4 left-1/2 -translate-x-1/2",
      "top-right": "top-4 right-4",
```

- **Line 43:23** - `left-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```

    const positionClasses = {
>     "top-left": "top-4 [left-4]",
      "top-center": "top-4 left-1/2 -translate-x-1/2",
      "top-right": "top-4 right-4",
```

- **Line 44:19** - `top-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
    const positionClasses = {
      "top-left": "top-4 left-4",
>     "top-center": "[top-4] left-1/2 -translate-x-1/2",
      "top-right": "top-4 right-4",
      "bottom-left": "bottom-4 left-4",
```

- **Line 44:25** - `left-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
    const positionClasses = {
      "top-left": "top-4 left-4",
>     "top-center": "top-4 [left-1]/2 -translate-x-1/2",
      "top-right": "top-4 right-4",
      "bottom-left": "bottom-4 left-4",
```

- **Line 45:18** - `top-4`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      "top-left": "top-4 left-4",
      "top-center": "top-4 left-1/2 -translate-x-1/2",
>     "top-right": "[top-4] right-4",
      "bottom-left": "bottom-4 left-4",
      "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
```

_... and 9 more violations of this type_

#### numeric-size (2)

- **Line 97:28** - `max-h-screen`
  - Suggestion: Use size tokens through component token system

```
      <div
        className={cn(
>         "fixed z-[100] flex [max-h-screen] w-full flex-col-reverse p-0 sm:flex-col",
          positionClasses,
        )}
```

- **Line 97:41** - `w-full`
  - Suggestion: Use size tokens through component token system

```
      <div
        className={cn(
>         "fixed z-[100] flex max-h-screen [w-full] flex-col-reverse p-0 sm:flex-col",
          positionClasses,
        )}
```

### src/components/ui/alert.tsx

**Violations:** 26

#### tailwind-bg-color (9)

- **Line 12:16** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
    variants: {
      variant: {
>       default: "[bg-muted] border-border text-foreground",
        // Canonical variants (Freeze API)
        primary: "bg-primary/10 border-primary/20 text-primary-foreground",
```

- **Line 14:16** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        default: "bg-muted border-border text-foreground",
        // Canonical variants (Freeze API)
>       primary: "[bg-primary]/10 border-primary/20 text-primary-foreground",
        secondary: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
        accent: "bg-accent/10 border-accent/20 text-accent-foreground",
```

- **Line 15:18** - `bg-secondary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        // Canonical variants (Freeze API)
        primary: "bg-primary/10 border-primary/20 text-primary-foreground",
>       secondary: "[bg-secondary]/10 border-secondary/20 text-secondary-foreground",
        accent: "bg-accent/10 border-accent/20 text-accent-foreground",
        destructive: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
```

- **Line 16:15** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        primary: "bg-primary/10 border-primary/20 text-primary-foreground",
        secondary: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
>       accent: "[bg-accent]/10 border-accent/20 text-accent-foreground",
        destructive: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
        // Legacy semantic variants (deprecated, mapped to canonical)
```

- **Line 17:20** - `bg-destructive`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        secondary: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
        accent: "bg-accent/10 border-accent/20 text-accent-foreground",
>       destructive: "[bg-destructive]/10 border-destructive/20 text-destructive-foreground",
        // Legacy semantic variants (deprecated, mapped to canonical)
        success: "bg-accent/10 border-accent/20 text-accent-foreground",
```

_... and 4 more violations of this type_

#### tailwind-text-color (9)

- **Line 12:39** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
    variants: {
      variant: {
>       default: "bg-muted border-border [text-foreground]",
        // Canonical variants (Freeze API)
        primary: "bg-primary/10 border-primary/20 text-primary-foreground",
```

- **Line 14:48** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        default: "bg-muted border-border text-foreground",
        // Canonical variants (Freeze API)
>       primary: "bg-primary/10 border-primary/20 [text-primary]-foreground",
        secondary: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
        accent: "bg-accent/10 border-accent/20 text-accent-foreground",
```

- **Line 15:54** - `text-secondary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        // Canonical variants (Freeze API)
        primary: "bg-primary/10 border-primary/20 text-primary-foreground",
>       secondary: "bg-secondary/10 border-secondary/20 [text-secondary]-foreground",
        accent: "bg-accent/10 border-accent/20 text-accent-foreground",
        destructive: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
```

- **Line 16:45** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        primary: "bg-primary/10 border-primary/20 text-primary-foreground",
        secondary: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
>       accent: "bg-accent/10 border-accent/20 [text-accent]-foreground",
        destructive: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
        // Legacy semantic variants (deprecated, mapped to canonical)
```

- **Line 17:60** - `text-destructive`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        secondary: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
        accent: "bg-accent/10 border-accent/20 text-accent-foreground",
>       destructive: "bg-destructive/10 border-destructive/20 [text-destructive]-foreground",
        // Legacy semantic variants (deprecated, mapped to canonical)
        success: "bg-accent/10 border-accent/20 text-accent-foreground",
```

_... and 4 more violations of this type_

#### tailwind-border-color (8)

- **Line 14:30** - `border-primary`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
        default: "bg-muted border-border text-foreground",
        // Canonical variants (Freeze API)
>       primary: "bg-primary/10 [border-primary]/20 text-primary-foreground",
        secondary: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
        accent: "bg-accent/10 border-accent/20 text-accent-foreground",
```

- **Line 15:34** - `border-secondary`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
        // Canonical variants (Freeze API)
        primary: "bg-primary/10 border-primary/20 text-primary-foreground",
>       secondary: "bg-secondary/10 [border-secondary]/20 text-secondary-foreground",
        accent: "bg-accent/10 border-accent/20 text-accent-foreground",
        destructive: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
```

- **Line 16:28** - `border-accent`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
        primary: "bg-primary/10 border-primary/20 text-primary-foreground",
        secondary: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
>       accent: "bg-accent/10 [border-accent]/20 text-accent-foreground",
        destructive: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
        // Legacy semantic variants (deprecated, mapped to canonical)
```

- **Line 17:38** - `border-destructive`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
        secondary: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
        accent: "bg-accent/10 border-accent/20 text-accent-foreground",
>       destructive: "bg-destructive/10 [border-destructive]/20 text-destructive-foreground",
        // Legacy semantic variants (deprecated, mapped to canonical)
        success: "bg-accent/10 border-accent/20 text-accent-foreground",
```

- **Line 19:29** - `border-accent`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
        destructive: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
        // Legacy semantic variants (deprecated, mapped to canonical)
>       success: "bg-accent/10 [border-accent]/20 text-accent-foreground",
        warning: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
        danger: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
```

_... and 3 more violations of this type_

### src/components/ui/body.tsx

**Violations:** 3

#### tailwind-text-color (2)

- **Line 8:36** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
  import { cn } from "@/lib/utils";

> const bodyVariants = cva("font-sans [text-foreground]", {
    variants: {
      size: {
```

- **Line 21:13** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      },
      muted: {
>       true: "[text-muted]-foreground",
        false: "",
      },
```

#### typography-size (1)

- **Line 12:11** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      size: {
        md: "text-md leading-relaxed tracking-normal",
>       lg: "[text-lg] leading-relaxed tracking-normal",
      },
      weight: {
```

### src/components/ui/caption.tsx

**Violations:** 3

#### tailwind-text-color (2)

- **Line 8:39** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
  import { cn } from "@/lib/utils";

> const captionVariants = cva("font-sans [text-foreground]", {
    variants: {
      weight: {
```

- **Line 15:13** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      },
      muted: {
>       true: "[text-muted]-foreground",
        false: "",
      },
```

#### typography-size (1)

- **Line 39:11** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
          ref={ref as any}
          className={cn(
>           "[text-xs] leading-tight tracking-wide",
            captionVariants({ weight, muted }),
            className,
```

### src/components/ui/card.tsx

**Violations:** 7

#### tailwind-bg-color (1)

- **Line 11:39** - `bg-card`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      <div
        ref={ref}
>       className={cn("rounded-xl border [bg-card] text-card-foreground shadow", className)}
        {...props}
      />
```

#### tailwind-text-color (2)

- **Line 11:47** - `text-card`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      <div
        ref={ref}
>       className={cn("rounded-xl border bg-card [text-card]-foreground shadow", className)}
        {...props}
      />
```

- **Line 38:42** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
  const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
>     <div ref={ref} className={cn("text-sm [text-muted]-foreground", className)} {...props} />
    ),
  );
```

#### numeric-spacing (2)

- **Line 45:39** - `pt-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
  const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
>     <div ref={ref} className={cn("p-lg [pt-0]", className)} {...props} />
    ),
  );
```

- **Line 52:57** - `pt-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
  const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
>     <div ref={ref} className={cn("flex items-center p-lg [pt-0]", className)} {...props} />
    ),
  );
```

#### numeric-radius (1)

- **Line 11:21** - `rounded-xl`
  - Suggestion: Use radius tokens through component token system

```
      <div
        ref={ref}
>       className={cn("[rounded-xl] border bg-card text-card-foreground shadow", className)}
        {...props}
      />
```

#### typography-size (1)

- **Line 38:34** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
  const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
>     <div ref={ref} className={cn("[text-sm] text-muted-foreground", className)} {...props} />
    ),
  );
```

### src/components/ui/code.tsx

**Violations:** 8

#### tailwind-bg-color (2)

- **Line 11:23** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
    variants: {
      variant: {
>       inline: "rounded [bg-muted] px-xs py-0.5 text-sm font-semibold",
        block: "block rounded-md bg-muted p-md text-sm font-semibold",
      },
```

- **Line 12:31** - `bg-muted`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      variant: {
        inline: "rounded bg-muted px-xs py-0.5 text-sm font-semibold",
>       block: "block rounded-md [bg-muted] p-md text-sm font-semibold",
      },
      muted: {
```

#### tailwind-text-color (2)

- **Line 8:36** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
  import { cn } from "@/lib/utils";

> const codeVariants = cva("font-mono [text-foreground]", {
    variants: {
      variant: {
```

- **Line 15:13** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      },
      muted: {
>       true: "[text-muted]-foreground",
        false: "",
      },
```

#### numeric-spacing (1)

- **Line 11:38** - `py-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
    variants: {
      variant: {
>       inline: "rounded bg-muted px-xs [py-0].5 text-sm font-semibold",
        block: "block rounded-md bg-muted p-md text-sm font-semibold",
      },
```

#### numeric-radius (1)

- **Line 12:20** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
      variant: {
        inline: "rounded bg-muted px-xs py-0.5 text-sm font-semibold",
>       block: "block [rounded-md] bg-muted p-md text-sm font-semibold",
      },
      muted: {
```

#### typography-size (2)

- **Line 11:45** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    variants: {
      variant: {
>       inline: "rounded bg-muted px-xs py-0.5 [text-sm] font-semibold",
        block: "block rounded-md bg-muted p-md text-sm font-semibold",
      },
```

- **Line 12:45** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      variant: {
        inline: "rounded bg-muted px-xs py-0.5 text-sm font-semibold",
>       block: "block rounded-md bg-muted p-md [text-sm] font-semibold",
      },
      muted: {
```

### src/components/ui/dialog.tsx

**Violations:** 17

#### tailwind-bg-color (3)

- **Line 24:146** - `bg-black`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 [bg-black]/80",
        className,
      )}
```

- **Line 41:463** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        ref={ref}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-md border [bg-background] p-lg shadow-lg duration-200 sm:rounded-lg",
          className,
        )}
```

- **Line 48:241** - `bg-accent`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        {children}
        <DialogPrimitive.Close
>         className="absolute right-md top-md rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:[bg-accent] data-[state=open]:text-muted-foreground"
          aria-label="Close dialog"
        >
```

#### tailwind-text-color (2)

- **Line 48:269** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        {children}
        <DialogPrimitive.Close
>         className="absolute right-md top-md rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:[text-muted]-foreground"
          aria-label="Close dialog"
        >
```

- **Line 90:27** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
    <DialogPrimitive.Description
      ref={ref}
>     className={cn("text-sm [text-muted]-foreground", className)}
      {...props}
    />
```

#### numeric-spacing (3)

- **Line 41:223** - `left-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        ref={ref}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-[left-1]/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-md border bg-background p-lg shadow-lg duration-200 sm:rounded-lg",
          className,
        )}
```

- **Line 41:307** - `left-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        ref={ref}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-[left-1]/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-md border bg-background p-lg shadow-lg duration-200 sm:rounded-lg",
          className,
        )}
```

- **Line 66:71** - `space-x-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
  const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
>     className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:[space-x-2]", className)}
      {...props}
    />
```

#### numeric-radius (2)

- **Line 41:508** - `rounded-lg`
  - Suggestion: Use radius tokens through component token system

```
        ref={ref}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-md border bg-background p-lg shadow-lg duration-200 sm:[rounded-lg]",
          className,
        )}
```

- **Line 48:44** - `rounded-sm`
  - Suggestion: Use radius tokens through component token system

```
        {children}
        <DialogPrimitive.Close
>         className="absolute right-md top-md [rounded-sm] opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          aria-label="Close dialog"
        >
```

#### numeric-size (3)

- **Line 41:395** - `w-full`
  - Suggestion: Use size tokens through component token system

```
        ref={ref}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid [w-full] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-md border bg-background p-lg shadow-lg duration-200 sm:rounded-lg",
          className,
        )}
```

- **Line 51:31** - `h-4`
  - Suggestion: Use size tokens through component token system

```
          aria-label="Close dialog"
        >
>         <Cross2Icon className="[h-4] w-4" aria-hidden="true" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
```

- **Line 51:35** - `w-4`
  - Suggestion: Use size tokens through component token system

```
          aria-label="Close dialog"
        >
>         <Cross2Icon className="h-4 [w-4]" aria-hidden="true" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
```

#### typography-size (2)

- **Line 78:19** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    <DialogPrimitive.Title
      ref={ref}
>     className={cn("[text-lg] font-semibold leading-none tracking-tight", className)}
      {...props}
    />
```

- **Line 90:19** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    <DialogPrimitive.Description
      ref={ref}
>     className={cn("[text-sm] text-muted-foreground", className)}
      {...props}
    />
```

#### transition-utility (1)

- **Line 48:89** - `transition-opacity`
  - Suggestion: Use MOTION_TOKENS for transitions

```
        {children}
        <DialogPrimitive.Close
>         className="absolute right-md top-md rounded-sm opacity-70 ring-offset-background [transition-opacity] hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          aria-label="Close dialog"
        >
```

#### duration-utility (1)

- **Line 41:492** - `duration-200`
  - Suggestion: Use MOTION_TOKENS for durations

```
        ref={ref}
        className={cn(
>         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-md border bg-background p-lg shadow-lg [duration-200] sm:rounded-lg",
          className,
        )}
```

### src/components/ui/display.tsx

**Violations:** 6

#### tailwind-text-color (2)

- **Line 8:42** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
  import { cn } from "@/lib/utils";

> const displayVariants = cva("font-display [text-foreground]", {
    variants: {
      size: {
```

- **Line 23:13** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      },
      muted: {
>       true: "[text-muted]-foreground",
        false: "",
      },
```

#### typography-size (4)

- **Line 11:11** - `text-xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    variants: {
      size: {
>       xl: "[text-xl] leading-normal tracking-normal",
        "2xl": "text-2xl leading-tight tracking-tight",
        "3xl": "text-3xl leading-tight tracking-tight",
```

- **Line 12:14** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      size: {
        xl: "text-xl leading-normal tracking-normal",
>       "2xl": "[text-2xl] leading-tight tracking-tight",
        "3xl": "text-3xl leading-tight tracking-tight",
        "4xl": "text-4xl leading-none tracking-tight",
```

- **Line 13:14** - `text-3xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        xl: "text-xl leading-normal tracking-normal",
        "2xl": "text-2xl leading-tight tracking-tight",
>       "3xl": "[text-3xl] leading-tight tracking-tight",
        "4xl": "text-4xl leading-none tracking-tight",
      },
```

- **Line 14:14** - `text-4xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        "2xl": "text-2xl leading-tight tracking-tight",
        "3xl": "text-3xl leading-tight tracking-tight",
>       "4xl": "[text-4xl] leading-none tracking-tight",
      },
      weight: {
```

### src/components/ui/field.tsx

**Violations:** 1

#### tailwind-text-color (1)

- **Line 78:52** - `text-destructive`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
  const FieldError = React.forwardRef<HTMLSpanElement, FieldErrorProps>(
    ({ className, ...props }, ref) => {
>     return <Text ref={ref} size="sm" className={cn("[text-destructive]", className)} {...props} />;
    },
  );
```

### src/components/ui/heading.tsx

**Violations:** 32

#### tailwind-text-color (2)

- **Line 8:42** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
  import { cn } from "@/lib/utils";

> const headingVariants = cva("font-display [text-foreground]", {
    variants: {
      level: {
```

- **Line 25:13** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      },
      muted: {
>       true: "[text-muted]-foreground",
        false: "",
      },
```

#### typography-size (30)

- **Line 11:10** - `text-5xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    variants: {
      level: {
>       1: "[text-5xl] font-bold leading-tight tracking-tight",
        2: "text-4xl font-bold leading-tight tracking-tight",
        3: "text-3xl font-semibold leading-snug tracking-normal",
```

- **Line 12:10** - `text-4xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      level: {
        1: "text-5xl font-bold leading-tight tracking-tight",
>       2: "[text-4xl] font-bold leading-tight tracking-tight",
        3: "text-3xl font-semibold leading-snug tracking-normal",
        4: "text-2xl font-semibold leading-snug tracking-normal",
```

- **Line 13:10** - `text-3xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        1: "text-5xl font-bold leading-tight tracking-tight",
        2: "text-4xl font-bold leading-tight tracking-tight",
>       3: "[text-3xl] font-semibold leading-snug tracking-normal",
        4: "text-2xl font-semibold leading-snug tracking-normal",
        5: "text-xl font-medium leading-normal tracking-normal",
```

- **Line 14:10** - `text-2xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        2: "text-4xl font-bold leading-tight tracking-tight",
        3: "text-3xl font-semibold leading-snug tracking-normal",
>       4: "[text-2xl] font-semibold leading-snug tracking-normal",
        5: "text-xl font-medium leading-normal tracking-normal",
        6: "text-lg font-medium leading-normal tracking-normal",
```

- **Line 15:10** - `text-xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        3: "text-3xl font-semibold leading-snug tracking-normal",
        4: "text-2xl font-semibold leading-snug tracking-normal",
>       5: "[text-xl] font-medium leading-normal tracking-normal",
        6: "text-lg font-medium leading-normal tracking-normal",
      },
```

_... and 25 more violations of this type_

### src/components/ui/lead.tsx

**Violations:** 4

#### tailwind-text-color (2)

- **Line 8:36** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
  import { cn } from "@/lib/utils";

> const leadVariants = cva("font-sans [text-foreground]", {
    variants: {
      size: {
```

- **Line 15:13** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      },
      muted: {
>       true: "[text-muted]-foreground",
        false: "",
      },
```

#### typography-size (2)

- **Line 11:11** - `text-lg`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    variants: {
      size: {
>       lg: "[text-lg] leading-normal tracking-normal",
        xl: "text-xl leading-normal tracking-normal",
      },
```

- **Line 12:11** - `text-xl`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      size: {
        lg: "text-lg leading-normal tracking-normal",
>       xl: "[text-xl] leading-normal tracking-normal",
      },
      muted: {
```

### src/components/ui/text.tsx

**Violations:** 10

#### tailwind-text-color (10)

- **Line 9:26** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
  import { TEXT_TOKENS } from "@/tokens/components/text";

> const textVariants = cva("[text-foreground]", {
    variants: {
      size: {
```

- **Line 25:13** - `text-muted`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      },
      muted: {
>       true: "[text-muted]-foreground",
        false: "",
      },
```

- **Line 32:16** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
       */
      variant: {
>       primary: "[text-primary]",
        secondary: "text-secondary-foreground",
        accent: "text-accent-foreground",
```

- **Line 33:18** - `text-secondary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      variant: {
        primary: "text-primary",
>       secondary: "[text-secondary]-foreground",
        accent: "text-accent-foreground",
        outline: "text-foreground",
```

- **Line 34:15** - `text-accent`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        primary: "text-primary",
        secondary: "text-secondary-foreground",
>       accent: "[text-accent]-foreground",
        outline: "text-foreground",
        ghost: "text-foreground",
```

_... and 5 more violations of this type_

### src/components/ui/toast.tsx

**Violations:** 33

#### tailwind-bg-color (4)

- **Line 32:25** - `bg-background`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      variants: {
        variant: {
>         default: "border [bg-background] text-foreground",
          destructive:
            "destructive group border-destructive bg-destructive text-destructive-foreground",
```

- **Line 34:48** - `bg-destructive`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
          default: "border bg-background text-foreground",
          destructive:
>           "destructive group border-destructive [bg-destructive] text-destructive-foreground",
        },
      },
```

- **Line 64:143** - `bg-secondary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-sm text-sm font-medium transition-colors hover:[bg-secondary] focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className,
      )}
```

- **Line 64:366** - `bg-destructive`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-sm text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:[bg-destructive] group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className,
      )}
```

#### tailwind-text-color (7)

- **Line 32:39** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      variants: {
        variant: {
>         default: "border bg-background [text-foreground]",
          destructive:
            "destructive group border-destructive bg-destructive text-destructive-foreground",
```

- **Line 34:63** - `text-destructive`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
          default: "border bg-background text-foreground",
          destructive:
>           "destructive group border-destructive bg-destructive [text-destructive]-foreground",
        },
      },
```

- **Line 64:408** - `text-destructive`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-sm text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:[text-destructive]-foreground group-[.destructive]:focus:ring-destructive",
        className,
      )}
```

- **Line 79:48** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "absolute right-xs top-xs rounded-md p-xs [text-foreground]/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive group-[.destructive]:focus:ring-offset-destructive",
        className,
      )}
```

- **Line 79:102** - `text-foreground`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "absolute right-xs top-xs rounded-md p-xs [text-foreground]/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive group-[.destructive]:focus:ring-offset-destructive",
        className,
      )}
```

_... and 2 more violations of this type_

#### tailwind-border-color (3)

- **Line 34:29** - `border-destructive`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
          default: "border bg-background text-foreground",
          destructive:
>           "destructive group [border-destructive] bg-destructive text-destructive-foreground",
        },
      },
```

- **Line 64:274** - `border-muted`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-sm text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:[border-muted]/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className,
      )}
```

- **Line 64:317** - `border-destructive`
  - Suggestion: Use token-based CSS variables (border-[hsl(var(--token))])

```
      ref={ref}
      className={cn(
>       "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-sm text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:[border-destructive]/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className,
      )}
```

#### numeric-spacing (3)

- **Line 19:13** - `top-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      ref={ref}
      className={cn(
>       "fixed [top-0] z-[100] flex max-h-screen w-full flex-col-reverse p-md sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className,
      )}
```

- **Line 19:77** - `bottom-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      ref={ref}
      className={cn(
>       "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-md sm:[bottom-0] sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className,
      )}
```

- **Line 19:89** - `right-0`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
      ref={ref}
      className={cn(
>       "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-md sm:bottom-0 sm:[right-0] sm:top-auto sm:flex-col md:max-w-[420px]",
        className,
      )}
```

#### numeric-radius (3)

- **Line 28:106** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```

  const toastVariants = cva(
>   "group pointer-events-auto relative flex w-full items-center justify-between space-x-sm overflow-hidden [rounded-md] border p-md pr-lg shadow-lg transition-[transform,border-color,box-shadow] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
      variants: {
```

- **Line 64:60** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
      ref={ref}
      className={cn(
>       "inline-flex h-8 shrink-0 items-center justify-center [rounded-md] border bg-transparent px-sm text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className,
      )}
```

- **Line 79:32** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
      ref={ref}
      className={cn(
>       "absolute right-xs top-xs [rounded-md] p-xs text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive group-[.destructive]:focus:ring-offset-destructive",
        className,
      )}
```

#### numeric-size (6)

- **Line 19:32** - `max-h-screen`
  - Suggestion: Use size tokens through component token system

```
      ref={ref}
      className={cn(
>       "fixed top-0 z-[100] flex [max-h-screen] w-full flex-col-reverse p-md sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className,
      )}
```

- **Line 19:45** - `w-full`
  - Suggestion: Use size tokens through component token system

```
      ref={ref}
      className={cn(
>       "fixed top-0 z-[100] flex max-h-screen [w-full] flex-col-reverse p-md sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className,
      )}
```

- **Line 28:43** - `w-full`
  - Suggestion: Use size tokens through component token system

```

  const toastVariants = cva(
>   "group pointer-events-auto relative flex [w-full] items-center justify-between space-x-sm overflow-hidden rounded-md border p-md pr-lg shadow-lg transition-[transform,border-color,box-shadow] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
      variants: {
```

- **Line 64:19** - `h-8`
  - Suggestion: Use size tokens through component token system

```
      ref={ref}
      className={cn(
>       "inline-flex [h-8] shrink-0 items-center justify-center rounded-md border bg-transparent px-sm text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className,
      )}
```

- **Line 85:27** - `h-4`
  - Suggestion: Use size tokens through component token system

```
      {...props}
    >
>     <Cross2Icon className="[h-4] w-4" />
    </ToastPrimitives.Close>
  ));
```

_... and 1 more violations of this type_

#### typography-size (4)

- **Line 64:99** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
      ref={ref}
      className={cn(
>       "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-sm [text-sm] font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className,
      )}
```

- **Line 96:19** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    <ToastPrimitives.Title
      ref={ref}
>     className={cn("[text-sm] font-semibold [&+div]:text-xs", className)}
      {...props}
    />
```

- **Line 96:49** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    <ToastPrimitives.Title
      ref={ref}
>     className={cn("text-sm font-semibold [&+div]:[text-xs]", className)}
      {...props}
    />
```

- **Line 108:19** - `text-sm`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
    <ToastPrimitives.Description
      ref={ref}
>     className={cn("[text-sm] opacity-90", className)}
      {...props}
    />
```

#### transition-utility (3)

- **Line 28:370** - `transition-none`
  - Suggestion: Use MOTION_TOKENS for transitions

```

  const toastVariants = cva(
>   "group pointer-events-auto relative flex w-full items-center justify-between space-x-sm overflow-hidden rounded-md border p-md pr-lg shadow-lg transition-[transform,border-color,box-shadow] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:[transition-none] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
      variants: {
```

- **Line 64:119** - `transition-colors`
  - Suggestion: Use MOTION_TOKENS for transitions

```
      ref={ref}
      className={cn(
>       "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-sm text-sm font-medium [transition-colors] hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className,
      )}
```

- **Line 79:77** - `transition-opacity`
  - Suggestion: Use MOTION_TOKENS for transitions

```
      ref={ref}
      className={cn(
>       "absolute right-xs top-xs rounded-md p-xs text-foreground/50 opacity-0 [transition-opacity] hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive group-[.destructive]:focus:ring-offset-destructive",
        className,
      )}
```

### src/components/ui/toaster.tsx

**Violations:** 1

#### numeric-spacing (1)

- **Line 21:33** - `gap-1`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
          return (
            <Toast key={id} {...props}>
>             <div className="grid [gap-1]">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
```

### src/components/ui/tooltip.tsx

**Violations:** 8

#### tailwind-bg-color (1)

- **Line 23:374** - `bg-primary`
  - Suggestion: Use token-based CSS variables (bg-[hsl(var(--token))])

```
        sideOffset={sideOffset}
        className={cn(
>         "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-[--radix-tooltip-content-transform-origin] overflow-hidden rounded-md [bg-primary] px-sm py-xs text-xs text-primary-foreground",
          className,
        )}
```

#### tailwind-text-color (1)

- **Line 23:405** - `text-primary`
  - Suggestion: Use token-based CSS variables (text-[hsl(var(--token))])

```
        sideOffset={sideOffset}
        className={cn(
>         "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-[--radix-tooltip-content-transform-origin] overflow-hidden rounded-md bg-primary px-sm py-xs text-xs [text-primary]-foreground",
          className,
        )}
```

#### numeric-spacing (4)

- **Line 23:169** - `top-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        sideOffset={sideOffset}
        className={cn(
>         "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-[top-2] data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-[--radix-tooltip-content-transform-origin] overflow-hidden rounded-md bg-primary px-sm py-xs text-xs text-primary-foreground",
          className,
        )}
```

- **Line 23:206** - `right-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        sideOffset={sideOffset}
        className={cn(
>         "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-[right-2] data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-[--radix-tooltip-content-transform-origin] overflow-hidden rounded-md bg-primary px-sm py-xs text-xs text-primary-foreground",
          className,
        )}
```

- **Line 23:246** - `left-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        sideOffset={sideOffset}
        className={cn(
>         "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-[left-2] data-[side=top]:slide-in-from-bottom-2 z-50 origin-[--radix-tooltip-content-transform-origin] overflow-hidden rounded-md bg-primary px-sm py-xs text-xs text-primary-foreground",
          className,
        )}
```

- **Line 23:283** - `bottom-2`
  - Suggestion: Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.)

```
        sideOffset={sideOffset}
        className={cn(
>         "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-[bottom-2] z-50 origin-[--radix-tooltip-content-transform-origin] overflow-hidden rounded-md bg-primary px-sm py-xs text-xs text-primary-foreground",
          className,
        )}
```

#### numeric-radius (1)

- **Line 23:363** - `rounded-md`
  - Suggestion: Use radius tokens through component token system

```
        sideOffset={sideOffset}
        className={cn(
>         "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-[--radix-tooltip-content-transform-origin] overflow-hidden [rounded-md] bg-primary px-sm py-xs text-xs text-primary-foreground",
          className,
        )}
```

#### typography-size (1)

- **Line 23:397** - `text-xs`
  - Suggestion: Use TYPOGRAPHY_TOKENS or component typography tokens

```
        sideOffset={sideOffset}
        className={cn(
>         "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-[--radix-tooltip-content-transform-origin] overflow-hidden rounded-md bg-primary px-sm py-xs [text-xs] text-primary-foreground",
          className,
        )}
```
