/**
 * Types for autodocs system
 */

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description?: string;
}

export interface VariantDefinition {
  name: string;
  options: string[];
  defaultValue?: string;
}

export interface ComponentAPI {
  name: string;
  description?: string;
  props: PropDefinition[];
  variants?: VariantDefinition[];
  examples?: string[];
  imports?: string[];
}

export interface ParsedComponent {
  filePath: string;
  componentName: string;
  api: ComponentAPI;
}
