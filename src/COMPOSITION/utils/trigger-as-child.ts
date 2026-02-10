import * as React from "react";

export function resolveAsChild(asChild: boolean | undefined, children: React.ReactNode): boolean {
  if (typeof asChild === "boolean") {
    return asChild;
  }
  // Default to false unless the child is a native DOM element or a ref-forwarding component.
  // This avoids implicitly enabling asChild for fragments or non-ref-forwarding components.
  if (!React.isValidElement(children)) return false;

  if (children.type === React.Fragment) return false;

  if (typeof children.type === "string") return true;

  const forwardRefSymbol = Symbol.for("react.forward_ref");
  const memoSymbol = Symbol.for("react.memo");

  // forwardRef components
  if ((children.type as any)?.$$typeof === forwardRefSymbol) return true;

  // memo(forwardRef(...)) components
  if ((children.type as any)?.$$typeof === memoSymbol) {
    const inner = (children.type as any).type;
    if (inner?.$$typeof === forwardRefSymbol) return true;
  }

  return false;
}

export function warnIfExplicitAsChildFalse(
  componentName: string,
  asChild: boolean | undefined,
  children: React.ReactNode,
): void {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  if (asChild === false && React.isValidElement(children)) {
    console.warn(
      `[${componentName}] \`asChild={false}\` used with a React element child. This will render a nested interactive element (e.g. <button> inside <button>). Remove \`asChild={false}\` or set \`asChild\` to true.`,
    );
  }
}
