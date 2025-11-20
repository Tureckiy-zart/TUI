# 📚 Storybook Story Template

## Component: {ComponentName}

### Story File Location

`src/components/{ComponentName}/{ComponentName}.stories.tsx`

---

## Basic Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { {ComponentName} } from './{ComponentName}';
import type { {ComponentName}Props } from './{ComponentName}.types';

const meta: Meta<typeof {ComponentName}> = {
  title: 'Components/{ComponentName}',
  component: {ComponentName},
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '{component_description}',
      },
    },
  },
  argTypes: {
    // Add argTypes for all props
    {prop_name}: {
      control: '{control_type}',
      description: '{prop_description}',
      table: {
        type: { summary: '{type_summary}' },
        defaultValue: { summary: '{default_value}' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof {ComponentName}>;

// Default story
export const Default: Story = {
  args: {
    // Add default args
  },
};

// Variant stories
export const {VariantName}: Story = {
  args: {
    // Add variant args
  },
};
```

---

## Story Variants Checklist

- [ ] Default story
- [ ] All variant stories
- [ ] All size stories
- [ ] Disabled state story
- [ ] Loading state story (if applicable)
- [ ] Error state story (if applicable)
- [ ] Edge cases stories

---

## Controls Configuration

### Control Types

- `select` - For enum/union types
- `boolean` - For boolean props
- `text` - For string props
- `number` - For number props
- `color` - For color props
- `date` - For date props
- `object` - For object props
- `array` - For array props

### Example Controls

```typescript
argTypes: {
  variant: {
    control: 'select',
    options: ['primary', 'secondary', 'outline'],
    description: 'Component variant style',
  },
  size: {
    control: 'select',
    options: ['sm', 'md', 'lg'],
    description: 'Component size',
  },
  disabled: {
    control: 'boolean',
    description: 'Disable component interaction',
  },
  onClick: {
    action: 'clicked',
    description: 'Click handler function',
  },
}
```

---

## Documentation

### Component Description

```typescript
parameters: {
  docs: {
    description: {
      component: `
        {ComponentName} component description.

        Supports multiple variants and sizes.

        **Accessibility**: Fully keyboard accessible with ARIA support.
      `,
    },
  },
}
```

### Story Description

```typescript
export const { StoryName }: Story = {
  args: {
    // args
  },
  parameters: {
    docs: {
      description: {
        story: "{story_description}",
      },
    },
  },
};
```

---

## Accessibility Testing

### a11y Configuration

```typescript
parameters: {
  a11y: {
    config: {
      rules: [
        {
          id: 'color-contrast',
          enabled: true,
        },
      ],
    },
  },
}
```

---

## Layout Configuration

### Layout Options

- `centered` - Center component
- `padded` - Add padding around component
- `fullscreen` - Full screen layout

```typescript
parameters: {
  layout: 'centered',
}
```

---

## Viewport Testing

### Viewport Configuration

```typescript
parameters: {
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '375px',
          height: '667px',
        },
      },
    },
  },
}
```

---

## Decorators

### Story-Level Decorators

```typescript
export const {StoryName}: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', background: '#f0f0f0' }}>
        <Story />
      </div>
    ),
  ],
};
```

---

## Story Creation Checklist

- [ ] Story file created
- [ ] Meta configuration added
- [ ] Controls configured for all props
- [ ] Default story created
- [ ] Variant stories created
- [ ] Documentation added
- [ ] Accessibility tested
- [ ] Responsive behavior tested
- [ ] Storybook builds successfully
- [ ] No console warnings/errors

---

**Template Version**: 1.0
**Last Updated**: TODO:DATE_CONFIRMATION
