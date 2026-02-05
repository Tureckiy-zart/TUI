/**
 * Utilities for tracking imports from UI library entry
 */

import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

import { isPublicUiEntry } from "./consumer-code-detection";
import { isFoundationComponent } from "./foundation-component-list";

/**
 * Track Foundation component imports from UI library entry
 */
export class FoundationImportTracker {
  private foundationImports = new Set<string>();

  /**
   * Process an import declaration and track Foundation components
   */
  processImport(node: TSESTree.ImportDeclaration): void {
    const source = node.source.value;

    if (typeof source !== "string") return;
    if (!isPublicUiEntry(source)) return;

    const isTypeOnly = node.importKind === "type";

    for (const spec of node.specifiers) {
      if (spec.type === AST_NODE_TYPES.ImportSpecifier) {
        if (spec.importKind === "type" || isTypeOnly) continue;
        // spec.imported can be Identifier or StringLiteral
        if (spec.imported.type === AST_NODE_TYPES.Identifier) {
          const importedName = spec.imported.name;
          const localName = spec.local.name;

          // Track if the imported component is a Foundation component
          if (isFoundationComponent(importedName)) {
            this.foundationImports.add(localName);
          }
        }
      }
    }
  }

  /**
   * Check if a component name is a tracked Foundation import
   */
  isFoundationImport(name: string): boolean {
    return this.foundationImports.has(name);
  }

  /**
   * Get all tracked Foundation import names
   */
  getFoundationImports(): Set<string> {
    return new Set(this.foundationImports);
  }

  /**
   * Clear all tracked imports
   */
  clear(): void {
    this.foundationImports.clear();
  }
}

/**
 * Track UI component imports from public UI entry
 */
export class UIImportTracker {
  private namedImports = new Set<string>();

  /**
   * Process an import declaration and track UI components (named/default/namespace)
   */
  processImport(node: TSESTree.ImportDeclaration): void {
    const source = node.source.value;

    if (typeof source !== "string") return;
    if (!isPublicUiEntry(source)) return;

    const isTypeOnly = node.importKind === "type";

    for (const spec of node.specifiers) {
      if (spec.type === AST_NODE_TYPES.ImportSpecifier) {
        if (spec.importKind === "type" || isTypeOnly) continue;
        if (spec.imported.type !== AST_NODE_TYPES.Identifier) continue;
        if (isFoundationComponent(spec.imported.name)) continue;
        this.namedImports.add(spec.local.name);
      }
    }
  }

  /**
   * Check if a name is a tracked UI component import
   */
  isUiImport(name: string): boolean {
    return this.namedImports.has(name);
  }

  /**
   * Check if a name is a tracked namespace import (e.g., UI.Box)
   */
  isNamespaceImport(_name: string): boolean {
    return false;
  }

  /**
   * Clear tracked imports
   */
  clear(): void {
    this.namedImports.clear();
  }
}
