import preset from "@tenerife.music/ui/preset";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};

export default config;
