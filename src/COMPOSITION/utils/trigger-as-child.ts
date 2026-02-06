import * as React from "react";

export function resolveAsChild(asChild: boolean | undefined, children: React.ReactNode): boolean {
  if (typeof asChild === "boolean") {
    return asChild;
  }
  return React.isValidElement(children);
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
