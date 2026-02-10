/**
 * RUNTIME GUARDS CANON
 * - TypeScript is NOT the source of truth for semantic enforcement.
 * - Semantic guards are DEV-only and operate on runtime string extraction (as/asChild/child.type).
 * - No TS-driven comparisons, no type expansions for semantics.
 */
const warnedKeys = new Set<string>();

export function isDev(): boolean {
  return process.env.NODE_ENV !== "production";
}

export function devThrow(message: string): void {
  if (isDev()) {
    throw new Error(message);
  }
}

export function devWarnOnce(key: string, message: string): void {
  if (!isDev()) {
    return;
  }
  if (warnedKeys.has(key)) {
    return;
  }
  warnedKeys.add(key);
  console.warn(message);
}

export function warnOnForbiddenSemanticElement(
  componentName: string,
  asTag: string | undefined,
  forbiddenTags: readonly string[],
  message?: string,
): void {
  if (!isDev()) {
    return;
  }
  if (!asTag) {
    return;
  }
  if (!forbiddenTags.includes(asTag)) {
    return;
  }
  devWarnOnce(
    `${componentName}:${asTag}`,
    message ??
      `[${componentName}] Raw <${asTag}> is forbidden here. Use canonical composition instead.`,
  );
}

export function safeFallback<T>(fallback: T, message: string): T {
  if (isDev()) {
    throw new Error(message);
  }
  return fallback;
}
