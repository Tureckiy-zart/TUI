/**
 * Utilities for detecting Tailwind utility classes
 */

/**
 * Common Tailwind utility class patterns
 * These patterns match common utility classes that should not be used
 * as parallel styling channels near Foundation components
 */
const TAILWIND_UTILITY_PATTERNS = [
  // Spacing utilities
  /^(p|m|gap|left|right|top|bottom|px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|space-x|space-y)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|64|96)$/,
  // Color utilities (raw colors)
  /^(bg|text|border|ring|outline|divide|accent)-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d+$/,
  // Size utilities
  /^(h|w|min-h|min-w|max-h|max-w)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|64|96|full|screen)$/,
  // Typography utilities (non-canonical)
  /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
  /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
  /^leading-(none|tight|snug|normal|relaxed|loose|\d+)$/,
  // Border radius utilities
  /^rounded-(none|sm|md|lg|xl|2xl|3xl|full)$/,
  // Shadow utilities
  /^shadow-(none|sm|md|lg|xl|2xl|inner)$/,
  // Transition utilities
  /^transition-(all|colors|opacity|transform|none)$/,
  // Display utilities
  /^(block|inline-block|inline|flex|inline-flex|grid|inline-grid|hidden)$/,
  // Position utilities
  /^(static|fixed|absolute|relative|sticky)$/,
] as const;

/**
 * Extract class names from a string
 */
function extractClassNames(text: string): string[] {
  return text
    .split(/\s+/)
    .map((cls) => cls.trim())
    .filter((cls) => cls.length > 0);
}

/**
 * Check if a class name is a Tailwind utility class
 */
export function isTailwindUtilityClass(className: string): boolean {
  return TAILWIND_UTILITY_PATTERNS.some((pattern) => pattern.test(className));
}

/**
 * Check if a className string contains Tailwind utility classes
 */
export function hasTailwindUtilities(className: string): boolean {
  const classes = extractClassNames(className);
  return classes.some((cls) => isTailwindUtilityClass(cls));
}

/**
 * Get all Tailwind utility classes from a className string
 */
export function getTailwindUtilities(className: string): string[] {
  const classes = extractClassNames(className);
  return classes.filter((cls) => isTailwindUtilityClass(cls));
}
