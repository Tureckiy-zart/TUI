// Use direct import from source to avoid requiring build in CI
// @ts-ignore - Direct import from source for CI compatibility
import type { Config } from "tailwindcss";
import preset from "../src/preset";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};

export default config;
