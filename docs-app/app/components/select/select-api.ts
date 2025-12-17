// API definitions for Select compound component subcomponents
export const SelectRootAPI = {
  name: "SelectRoot",
  description:
    "Radix Select Root (context provider). Controlled/uncontrolled value lives here. Not a DOM element.",
  props: [
    {
      name: "value",
      type: "string",
      required: false,
      description: "Controlled selected value.",
    },
    {
      name: "defaultValue",
      type: "string",
      required: false,
      description: "Uncontrolled initial value.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      required: false,
      description: "Called when selection changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      description: "Disables the entire Select (delegated to Radix).",
    },
    {
      name: "name",
      type: "string",
      required: false,
      description: "Form field name (Radix passes it to the hidden input).",
    },
    {
      name: "required",
      type: "boolean",
      required: false,
      description: "Marks the Select as required for form submission.",
    },
  ],
} as const;

export const SelectTriggerAPI = {
  name: "SelectTrigger",
  description: "Trigger button (combobox). Holds styling tokens and accessible name.",
  props: [
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl" | Responsive<SelectSizeToken>',
      required: false,
      defaultValue: "md",
      description: "Token-driven size.",
    },
    {
      name: "variant",
      type: '"primary" | "secondary" | "outline" | "ghost" | "destructive"',
      required: false,
      defaultValue: "outline",
      description: "Token-driven visual variant.",
    },
    {
      name: "width",
      type: '"auto" | "full" | "sm" | "md" | "lg" | "xl" | Responsive<SelectWidthToken>',
      required: false,
      defaultValue: "full",
      description: "Token-driven width constraint for the trigger.",
    },
    {
      name: "id",
      type: "string",
      required: false,
      description: "Use with <label htmlFor> for form association.",
    },
    {
      name: "aria-label / aria-labelledby",
      type: "string",
      required: false,
      description: "Required when no visible <label> is associated.",
    },
  ],
} as const;

export const SelectContentAPI = {
  name: "SelectContent",
  description: "Dropdown content (portal). Offsets are token-based.",
  props: [
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl" | Responsive<SelectSizeToken>',
      required: false,
      defaultValue: "md",
      description: "Token-driven size (padding + radius).",
    },
    {
      name: "sideOffset",
      type: "Responsive<SpacingToken>",
      required: false,
      defaultValue: "xs",
      description: "Token-driven offset between trigger and content.",
    },
    {
      name: "alignOffset",
      type: "Responsive<SpacingToken>",
      required: false,
      description: "Token-driven alignment offset for the content.",
    },
    {
      name: "position",
      type: '"popper" | "item-aligned"',
      required: false,
      defaultValue: "popper",
      description: "Radix positioning mode.",
    },
  ],
} as const;
