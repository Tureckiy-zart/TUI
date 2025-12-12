/**
 * ESLint Plugin Loader
 *
 * This file loads the TypeScript ESLint plugin using tsx
 */

import { register } from "tsx/esm/api";

// Register tsx to handle TypeScript imports
register();

// Import and export the plugin
const plugin = await import("./index.ts");
export default plugin.default;
