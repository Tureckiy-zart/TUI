# T07 Real Telemetry Snapshot — Storybook

## 1. Execution context (Storybook version, date)
- Storybook: 10.1.10
- Date: 2026-02-09

## 2. Snapshot method
- Storybook DEV run.
- Stories opened (per user input): Modal, Popover, Tooltip, ContextMenu, Menu, Select, Menu.Trigger, Box, NavRoot.
- Console call:
  - `import('/src/DEV/classname-telemetry.ts').then(m => m.getTelemetrySnapshot())`
- Optional reset call:
  - `import('/src/DEV/classname-telemetry.ts').then(m => m.resetTelemetry())`

## 3. Raw telemetry data
**Snapshot A (Modal):**
```json
{
  "enabled": true,
  "totals": {
    "classNameCount": 63,
    "styleCount": 12
  },
  "perZone": {
    "Foundation": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Composition": {
      "classNameCount": 63,
      "styleCount": 12,
      "buckets": {
        "spacing": 76,
        "layout": 33,
        "positioning": 0,
        "typography": 11,
        "color": 20,
        "other": 90
      }
    },
    "Domain": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    }
  },
  "perComponent": {
    "Box": {
      "zone": "Composition",
      "classNameCount": 40,
      "styleCount": 12,
      "buckets": {
        "spacing": 18,
        "layout": 21,
        "positioning": 0,
        "typography": 0,
        "color": 9,
        "other": 43
      }
    },
    "Menu.Trigger": {
      "zone": "Composition",
      "classNameCount": 12,
      "styleCount": 0,
      "buckets": {
        "spacing": 36,
        "layout": 12,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 36
      }
    },
    "Tooltip.Trigger": {
      "zone": "Composition",
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Modal.Trigger": {
      "zone": "Composition",
      "classNameCount": 11,
      "styleCount": 0,
      "buckets": {
        "spacing": 22,
        "layout": 0,
        "positioning": 0,
        "typography": 11,
        "color": 11,
        "other": 11
      }
    }
  }
}
```

**Snapshot B (Popover):**
```json
{
  "enabled": true,
  "totals": {
    "classNameCount": 63,
    "styleCount": 12
  },
  "perZone": {
    "Foundation": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Composition": {
      "classNameCount": 63,
      "styleCount": 12,
      "buckets": {
        "spacing": 76,
        "layout": 33,
        "positioning": 0,
        "typography": 11,
        "color": 20,
        "other": 90
      }
    },
    "Domain": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    }
  },
  "perComponent": {
    "Box": {
      "zone": "Composition",
      "classNameCount": 40,
      "styleCount": 12,
      "buckets": {
        "spacing": 18,
        "layout": 21,
        "positioning": 0,
        "typography": 0,
        "color": 9,
        "other": 43
      }
    },
    "Menu.Trigger": {
      "zone": "Composition",
      "classNameCount": 12,
      "styleCount": 0,
      "buckets": {
        "spacing": 36,
        "layout": 12,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 36
      }
    },
    "Tooltip.Trigger": {
      "zone": "Composition",
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Modal.Trigger": {
      "zone": "Composition",
      "classNameCount": 11,
      "styleCount": 0,
      "buckets": {
        "spacing": 22,
        "layout": 0,
        "positioning": 0,
        "typography": 11,
        "color": 11,
        "other": 11
      }
    },
    "Popover.Trigger": {
      "zone": "Composition",
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    }
  }
}
```

**Snapshot C (Tooltip):**
```json
{
  "enabled": true,
  "totals": {
    "classNameCount": 63,
    "styleCount": 12
  },
  "perZone": {
    "Foundation": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Composition": {
      "classNameCount": 63,
      "styleCount": 12,
      "buckets": {
        "spacing": 76,
        "layout": 33,
        "positioning": 0,
        "typography": 11,
        "color": 20,
        "other": 90
      }
    },
    "Domain": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    }
  },
  "perComponent": {
    "Box": {
      "zone": "Composition",
      "classNameCount": 40,
      "styleCount": 12,
      "buckets": {
        "spacing": 18,
        "layout": 21,
        "positioning": 0,
        "typography": 0,
        "color": 9,
        "other": 43
      }
    },
    "Menu.Trigger": {
      "zone": "Composition",
      "classNameCount": 12,
      "styleCount": 0,
      "buckets": {
        "spacing": 36,
        "layout": 12,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 36
      }
    },
    "Tooltip.Trigger": {
      "zone": "Composition",
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Modal.Trigger": {
      "zone": "Composition",
      "classNameCount": 11,
      "styleCount": 0,
      "buckets": {
        "spacing": 22,
        "layout": 0,
        "positioning": 0,
        "typography": 11,
        "color": 11,
        "other": 11
      }
    },
    "Popover.Trigger": {
      "zone": "Composition",
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    }
  }
}
```

**Snapshot D (ContextMenu):**
```json
{
  "enabled": true,
  "totals": {
    "classNameCount": 94,
    "styleCount": 12
  },
  "perZone": {
    "Foundation": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Composition": {
      "classNameCount": 94,
      "styleCount": 12,
      "buckets": {
        "spacing": 148,
        "layout": 43,
        "positioning": 0,
        "typography": 29,
        "color": 20,
        "other": 162
      }
    },
    "Domain": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    }
  },
  "perComponent": {
    "Box": {
      "zone": "Composition",
      "classNameCount": 40,
      "styleCount": 12,
      "buckets": {
        "spacing": 18,
        "layout": 21,
        "positioning": 0,
        "typography": 0,
        "color": 9,
        "other": 43
      }
    },
    "Menu.Trigger": {
      "zone": "Composition",
      "classNameCount": 12,
      "styleCount": 0,
      "buckets": {
        "spacing": 36,
        "layout": 12,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 36
      }
    },
    "Tooltip.Trigger": {
      "zone": "Composition",
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Modal.Trigger": {
      "zone": "Composition",
      "classNameCount": 11,
      "styleCount": 0,
      "buckets": {
        "spacing": 22,
        "layout": 0,
        "positioning": 0,
        "typography": 11,
        "color": 11,
        "other": 11
      }
    },
    "Popover.Trigger": {
      "zone": "Composition",
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "ContextMenu.Trigger": {
      "zone": "Composition",
      "classNameCount": 31,
      "styleCount": 0,
      "buckets": {
        "spacing": 72,
        "layout": 10,
        "positioning": 0,
        "typography": 18,
        "color": 0,
        "other": 72
      }
    }
  }
}
```

**Snapshot E (Menu):**
```json
{
  "enabled": true,
  "totals": {
    "classNameCount": 106,
    "styleCount": 12
  },
  "perZone": {
    "Foundation": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Composition": {
      "classNameCount": 106,
      "styleCount": 12,
      "buckets": {
        "spacing": 184,
        "layout": 55,
        "positioning": 0,
        "typography": 29,
        "color": 20,
        "other": 198
      }
    },
    "Domain": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    }
  },
  "perComponent": {
    "Box": {
      "zone": "Composition",
      "classNameCount": 40,
      "styleCount": 12,
      "buckets": {
        "spacing": 18,
        "layout": 21,
        "positioning": 0,
        "typography": 0,
        "color": 9,
        "other": 43
      }
    },
    "Menu.Trigger": {
      "zone": "Composition",
      "classNameCount": 24,
      "styleCount": 0,
      "buckets": {
        "spacing": 72,
        "layout": 24,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 72
      }
    },
    "Tooltip.Trigger": {
      "zone": "Composition",
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Modal.Trigger": {
      "zone": "Composition",
      "classNameCount": 11,
      "styleCount": 0,
      "buckets": {
        "spacing": 22,
        "layout": 0,
        "positioning": 0,
        "typography": 11,
        "color": 11,
        "other": 11
      }
    },
    "Popover.Trigger": {
      "zone": "Composition",
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "ContextMenu.Trigger": {
      "zone": "Composition",
      "classNameCount": 31,
      "styleCount": 0,
      "buckets": {
        "spacing": 72,
        "layout": 10,
        "positioning": 0,
        "typography": 18,
        "color": 0,
        "other": 72
      }
    }
  }
}
```

**Snapshot F (Select):**
```json
{
  "enabled": true,
  "totals": {
    "classNameCount": 106,
    "styleCount": 12
  },
  "perZone": {
    "Foundation": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Composition": {
      "classNameCount": 106,
      "styleCount": 12,
      "buckets": {
        "spacing": 184,
        "layout": 55,
        "positioning": 0,
        "typography": 29,
        "color": 20,
        "other": 198
      }
    },
    "Domain": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    }
  },
  "perComponent": {
    "Box": {
      "zone": "Composition",
      "classNameCount": 40,
      "styleCount": 12,
      "buckets": {
        "spacing": 18,
        "layout": 21,
        "positioning": 0,
        "typography": 0,
        "color": 9,
        "other": 43
      }
    },
    "Menu.Trigger": {
      "zone": "Composition",
      "classNameCount": 24,
      "styleCount": 0,
      "buckets": {
        "spacing": 72,
        "layout": 24,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 72
      }
    },
    "Tooltip.Trigger": {
      "zone": "Composition",
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Modal.Trigger": {
      "zone": "Composition",
      "classNameCount": 11,
      "styleCount": 0,
      "buckets": {
        "spacing": 22,
        "layout": 0,
        "positioning": 0,
        "typography": 11,
        "color": 11,
        "other": 11
      }
    },
    "Popover.Trigger": {
      "zone": "Composition",
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "ContextMenu.Trigger": {
      "zone": "Composition",
      "classNameCount": 31,
      "styleCount": 0,
      "buckets": {
        "spacing": 72,
        "layout": 10,
        "positioning": 0,
        "typography": 18,
        "color": 0,
        "other": 72
      }
    },
    "Select.Trigger": {
      "zone": "Composition",
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    }
  }
}
```

**Snapshot G (Menu.Trigger only):**
```json
{
  "enabled": true,
  "totals": {
    "classNameCount": 52,
    "styleCount": 12
  },
  "perZone": {
    "Foundation": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Composition": {
      "classNameCount": 52,
      "styleCount": 12,
      "buckets": {
        "spacing": 54,
        "layout": 33,
        "positioning": 0,
        "typography": 0,
        "color": 9,
        "other": 79
      }
    },
    "Domain": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    }
  },
  "perComponent": {
    "Box": {
      "zone": "Composition",
      "classNameCount": 40,
      "styleCount": 12,
      "buckets": {
        "spacing": 18,
        "layout": 21,
        "positioning": 0,
        "typography": 0,
        "color": 9,
        "other": 43
      }
    },
    "Menu.Trigger": {
      "zone": "Composition",
      "classNameCount": 12,
      "styleCount": 0,
      "buckets": {
        "spacing": 36,
        "layout": 12,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 36
      }
    }
  }
}
```

**Snapshot H (Box only):**
```json
{
  "enabled": true,
  "totals": {
    "classNameCount": 4,
    "styleCount": 0
  },
  "perZone": {
    "Foundation": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Composition": {
      "classNameCount": 4,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 4,
        "color": 0,
        "other": 0
      }
    },
    "Domain": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    }
  },
  "perComponent": {
    "Box": {
      "zone": "Composition",
      "classNameCount": 4,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 4,
        "color": 0,
        "other": 0
      }
    }
  }
}
```

**Snapshot I (NavRoot):**
```json
{
  "enabled": true,
  "totals": {
    "classNameCount": 4,
    "styleCount": 0
  },
  "perZone": {
    "Foundation": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    },
    "Composition": {
      "classNameCount": 4,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 4,
        "color": 0,
        "other": 0
      }
    },
    "Domain": {
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    }
  },
  "perComponent": {
    "Box": {
      "zone": "Composition",
      "classNameCount": 4,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 4,
        "color": 0,
        "other": 0
      }
    },
    "NavRoot": {
      "zone": "Composition",
      "classNameCount": 0,
      "styleCount": 0,
      "buckets": {
        "spacing": 0,
        "layout": 0,
        "positioning": 0,
        "typography": 0,
        "color": 0,
        "other": 0
      }
    }
  }
}
```

## 4. Aggregated tables
**Totals (Snapshot E / F):**
| metric | value |
| --- | --- |
| classNameCount | 106 |
| styleCount | 12 |

**perZone (Snapshot E / F):**
| zone | classNameCount | styleCount | spacing | layout | positioning | typography | color | other |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Foundation | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Composition | 106 | 12 | 184 | 55 | 0 | 29 | 20 | 198 |
| Domain | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

**perComponent (Snapshot E / F):**
| component | zone | classNameCount | styleCount | spacing | layout | positioning | typography | color | other |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Box | Composition | 40 | 12 | 18 | 21 | 0 | 0 | 9 | 43 |
| Menu.Trigger | Composition | 24 | 0 | 72 | 24 | 0 | 0 | 0 | 72 |
| Tooltip.Trigger | Composition | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Modal.Trigger | Composition | 11 | 0 | 22 | 0 | 0 | 11 | 11 | 11 |
| Popover.Trigger | Composition | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| ContextMenu.Trigger | Composition | 31 | 0 | 72 | 10 | 0 | 18 | 0 | 72 |
| Select.Trigger | Composition | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

## 5. Explicit non-interpretation statement
Data presented without conclusions, interpretations or recommendations.

## 6. Open questions (if any)
- Is a rerun required for Tooltip/Popover/Select with active triggers to get non-zero values?
