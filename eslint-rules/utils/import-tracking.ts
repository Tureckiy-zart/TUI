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

    for (const spec of node.specifiers) {
      if (spec.type === AST_NODE_TYPES.ImportSpecifier) {
        // spec.imported can be Identifier or StringLiteral
        if (spec.imported.type === AST_NODE_TYPES.Identifier) {
          const importedName = spec.imported.name;
          const localName = spec.local.name;

          // Track if the imported component is a Foundation component
          if (isFoundationComponent(importedName)) {
            this.foundationImports.add(localName);
          }
        }
      } else if (spec.type === AST_NODE_TYPES.ImportDefaultSpecifier) {
        // Handle default imports - check if the module name suggests Foundation
        // This is less precise but covers cases like `import Button from "@tenerife.music/ui/components/Button"`
        const localName = spec.local.name;
        if (isFoundationComponent(localName)) {
          this.foundationImports.add(localName);
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
