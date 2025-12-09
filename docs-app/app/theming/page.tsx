import type { Metadata } from "next";

import { CodeBlock } from "@/components/docs/CodeBlock";
import { LiveExample } from "@/components/docs/LiveExample";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Theming Guide - Tenerife UI",
  description:
    "Learn how to customize themes, create custom themes, and work with CSS variables in Tenerife UI",
};

export default function ThemingPage() {
  return (
    <PageShell>
      <h1 className="mb-4 font-display text-4xl font-bold">Theming Guide</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Learn how to customize themes, create custom themes, and work with CSS variables in Tenerife
        UI.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="mb-4 text-3xl font-semibold">ThemeProvider</h2>
          <p className="mb-6 text-muted-foreground">
            ThemeProvider manages day/night modes and theme overrides in your application.
          </p>

          <LiveExample>
            {`import { ThemeProvider, Button } from '@tenerife.music/ui';

export default function App() {
  return (
    <ThemeProvider defaultMode="night" enableSystem>
      <Button>Hello Tenerife UI</Button>
    </ThemeProvider>
  );
}`}
          </LiveExample>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">CSS Variables</h2>
          <p className="mb-6 text-muted-foreground">
            Tenerife UI uses CSS variables for theming. All tokens are exposed as CSS custom
            properties.
          </p>

          <CodeBlock language="css">
            {`/* Color variables */
--primary: 215 20% 35%;
--accent: 280 70% 67%;
--secondary: 173 100% 37%;

/* Spacing variables */
--spacing-4: 1rem;
--spacing-8: 2rem;

/* Typography variables */
--font-size-base: clamp(1rem, 0.9rem + 0.25vw, 1.125rem);
--font-weight-normal: 400;`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">Custom Themes</h2>
          <p className="mb-6 text-muted-foreground">
            Create custom themes by overriding CSS variables.
          </p>

          <LiveExample>
            {`import { ThemeProvider, Button } from '@tenerife.music/ui';

export default function App() {
  return (
    <ThemeProvider defaultMode="night">
      <div style={{
        '--primary': '200 100% 50%',
        '--accent': '300 100% 60%',
      } as React.CSSProperties}>
        <Button>Custom Theme Button</Button>
      </div>
    </ThemeProvider>
  );
}`}
          </LiveExample>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold">Dynamic Theme Switching</h2>
          <p className="mb-6 text-muted-foreground">
            Switch between themes programmatically using the useTheme hook.
          </p>

          <LiveExample>
            {`import { ThemeProvider, useTheme, Button } from '@tenerife.music/ui';

function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  
  return (
    <Button onClick={toggleMode}>
      Switch to {mode === 'night' ? 'day' : 'night'} mode
    </Button>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultMode="night">
      <ThemeToggle />
    </ThemeProvider>
  );
}`}
          </LiveExample>
        </section>
      </div>
    </PageShell>
  );
}
