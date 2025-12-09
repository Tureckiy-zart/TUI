import type { Metadata } from "next";

import { CodeBlock } from "@/components/docs/CodeBlock";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Installation - Tenerife UI",
  description: "Install and configure Tenerife UI in your project",
};

export default function InstallationPage() {
  return (
    <PageShell>
      <h1 className="mb-4 font-display text-4xl font-bold">Installation</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Install and configure Tenerife UI in your project.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Package Installation</h2>
          <p className="mb-4 text-muted-foreground">
            Install the package using your preferred package manager:
          </p>
          <CodeBlock language="bash">
            {`npm install @tenerife.music/ui
# or
pnpm add @tenerife.music/ui
# or
yarn add @tenerife.music/ui`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Next.js Setup</h2>
          <p className="mb-4 text-muted-foreground">
            Configure Tailwind CSS with the Tenerife UI preset:
          </p>
          <CodeBlock language="typescript">
            {`// tailwind.config.ts
import type { Config } from "tailwindcss";
import preset from "@tenerife.music/ui/preset";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};

export default config;`}
          </CodeBlock>

          <p className="mb-4 mt-4 text-muted-foreground">Import styles in your root layout:</p>
          <CodeBlock language="typescript">
            {`// app/layout.tsx
import "@tenerife.music/ui/styles";
import { ThemeProvider } from "@tenerife.music/ui/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultMode="night">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Vite Setup</h2>
          <p className="mb-4 text-muted-foreground">Similar setup for Vite projects:</p>
          <CodeBlock language="typescript">
            {`// tailwind.config.ts
import type { Config } from "tailwindcss";
import preset from "@tenerife.music/ui/preset";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};

export default config;`}
          </CodeBlock>
        </section>
      </div>
    </PageShell>
  );
}
