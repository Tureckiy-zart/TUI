export type Mode = "day" | "night";

export type ColorTokens = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
};

export const cssVariableColorTokens: Record<Mode, ColorTokens> = {
  day: {
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    card: "hsl(var(--card))",
    cardForeground: "hsl(var(--card-foreground))",
    popover: "hsl(var(--popover))",
    popoverForeground: "hsl(var(--popover-foreground))",
    primary: "hsl(var(--tm-primary))",
    primaryForeground: "hsl(var(--tm-primary-foreground))",
    secondary: "hsl(var(--tm-secondary))",
    secondaryForeground: "hsl(var(--tm-secondary-foreground))",
    muted: "hsl(var(--muted))",
    mutedForeground: "hsl(var(--muted-foreground))",
    accent: "hsl(var(--tm-accent))",
    accentForeground: "hsl(var(--tm-accent-foreground))",
    destructive: "hsl(var(--destructive))",
    destructiveForeground: "hsl(var(--destructive-foreground))",
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
    chart1: "hsl(12, 76%, 61%)",
    chart2: "hsl(173, 58%, 39%)",
    chart3: "hsl(197, 37%, 24%)",
    chart4: "hsl(43, 74%, 66%)",
    chart5: "hsl(27, 87%, 67%)"
  },
  night: {
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    card: "hsl(var(--card))",
    cardForeground: "hsl(var(--card-foreground))",
    popover: "hsl(var(--popover))",
    popoverForeground: "hsl(var(--popover-foreground))",
    primary: "hsl(var(--tm-primary))",
    primaryForeground: "hsl(var(--tm-primary-foreground))",
    secondary: "hsl(var(--tm-secondary))",
    secondaryForeground: "hsl(var(--tm-secondary-foreground))",
    muted: "hsl(var(--muted))",
    mutedForeground: "hsl(var(--muted-foreground))",
    accent: "hsl(var(--tm-accent))",
    accentForeground: "hsl(var(--tm-accent-foreground))",
    destructive: "hsl(var(--destructive))",
    destructiveForeground: "hsl(var(--destructive-foreground))",
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
    chart1: "hsl(220, 70%, 50%)",
    chart2: "hsl(160, 60%, 45%)",
    chart3: "hsl(30, 80%, 55%)",
    chart4: "hsl(280, 65%, 60%)",
    chart5: "hsl(340, 75%, 55%)"
  }
};

export const tailwindThemeColors = {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))"
  },
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))"
  },
  primary: {
    DEFAULT: "hsl(var(--tm-primary))",
    foreground: "hsl(var(--tm-primary-foreground))"
  },
  secondary: {
    DEFAULT: "hsl(var(--tm-secondary))",
    foreground: "hsl(var(--tm-secondary-foreground))"
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))"
  },
  accent: {
    DEFAULT: "hsl(var(--tm-accent))",
    foreground: "hsl(var(--tm-accent-foreground))"
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))"
  },
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  chart: {
    1: "hsl(var(--chart-1))",
    2: "hsl(var(--chart-2))",
    3: "hsl(var(--chart-3))",
    4: "hsl(var(--chart-4))",
    5: "hsl(var(--chart-5))"
  }
};
