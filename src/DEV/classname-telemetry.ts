export type TelemetryZone = "Foundation" | "Composition" | "Domain";

export type TelemetryBuckets = {
  spacing: number;
  layout: number;
  positioning: number;
  typography: number;
  chroma: number;
  other: number;
};

export type ComponentTelemetry = {
  zone: TelemetryZone;
  classNameCount: number;
  styleCount: number;
  buckets: TelemetryBuckets;
};

export type TelemetrySnapshot = {
  enabled: boolean;
  totals: {
    classNameCount: number;
    styleCount: number;
  };
  perZone: Record<
    TelemetryZone,
    { classNameCount: number; styleCount: number; buckets: TelemetryBuckets }
  >;
  perComponent: Record<string, ComponentTelemetry>;
};

const isDev = (): boolean => process.env.NODE_ENV !== "production";

const bucketOrder: (keyof TelemetryBuckets)[] = [
  "spacing",
  "layout",
  "positioning",
  "typography",
  "chroma",
  "other",
];

const createBuckets = (): TelemetryBuckets => ({
  spacing: 0,
  layout: 0,
  positioning: 0,
  typography: 0,
  chroma: 0,
  other: 0,
});

const state: TelemetrySnapshot = {
  enabled: false,
  totals: {
    classNameCount: 0,
    styleCount: 0,
  },
  perZone: {
    Foundation: { classNameCount: 0, styleCount: 0, buckets: createBuckets() },
    Composition: { classNameCount: 0, styleCount: 0, buckets: createBuckets() },
    Domain: { classNameCount: 0, styleCount: 0, buckets: createBuckets() },
  },
  perComponent: {},
};

const classifyToken = (token: string): keyof TelemetryBuckets => {
  if (
    token.startsWith("p-") ||
    token.startsWith("px-") ||
    token.startsWith("py-") ||
    token.startsWith("m-") ||
    token.startsWith("mx-") ||
    token.startsWith("my-") ||
    token.startsWith("gap-") ||
    token.startsWith("space-")
  ) {
    return "spacing";
  }
  if (
    token === "flex" ||
    token === "grid" ||
    token === "block" ||
    token === "inline" ||
    token === "inline-flex" ||
    token === "inline-grid"
  ) {
    return "layout";
  }
  if (
    token === "absolute" ||
    token === "relative" ||
    token === "fixed" ||
    token === "sticky" ||
    token.startsWith("top-") ||
    token.startsWith("right-") ||
    token.startsWith("bottom-") ||
    token.startsWith("left-") ||
    token.startsWith("inset-") ||
    token.startsWith("z-")
  ) {
    return "positioning";
  }
  if (
    token.startsWith("text-") ||
    token.startsWith("font-") ||
    token.startsWith("leading-") ||
    token.startsWith("tracking-")
  ) {
    return "typography";
  }
  if (
    token.startsWith("bg-") ||
    token.startsWith("border-") ||
    token.startsWith("from-") ||
    token.startsWith("via-") ||
    token.startsWith("to-") ||
    token.startsWith("fill-") ||
    token.startsWith("stroke-")
  ) {
    return "chroma";
  }
  return "other";
};

const ensureComponent = (component: string, zone: TelemetryZone): ComponentTelemetry => {
  if (!state.perComponent[component]) {
    state.perComponent[component] = {
      zone,
      classNameCount: 0,
      styleCount: 0,
      buckets: createBuckets(),
    };
  }
  return state.perComponent[component];
};

const recordBuckets = (buckets: TelemetryBuckets, className: string) => {
  const tokens = className.split(/\s+/).filter(Boolean);
  for (const token of tokens) {
    const bucket = classifyToken(token);
    buckets[bucket] += 1;
  }
};

export const trackClassStyleUsage = (input: {
  component: string;
  zone: TelemetryZone;
  className?: unknown;
  style?: unknown;
}): void => {
  if (!isDev()) return;
  if (typeof window === "undefined") return;

  state.enabled = true;

  const component = ensureComponent(input.component, input.zone);

  if (typeof input.className === "string" && input.className.trim().length > 0) {
    state.totals.classNameCount += 1;
    state.perZone[input.zone].classNameCount += 1;
    component.classNameCount += 1;

    recordBuckets(state.perZone[input.zone].buckets, input.className);
    recordBuckets(component.buckets, input.className);
  }

  if (
    input.style &&
    typeof input.style === "object" &&
    Object.keys(input.style as object).length > 0
  ) {
    state.totals.styleCount += 1;
    state.perZone[input.zone].styleCount += 1;
    component.styleCount += 1;
  }
};

export const getTelemetrySnapshot = (): TelemetrySnapshot => {
  if (!isDev()) {
    return {
      enabled: false,
      totals: { classNameCount: 0, styleCount: 0 },
      perZone: {
        Foundation: { classNameCount: 0, styleCount: 0, buckets: createBuckets() },
        Composition: { classNameCount: 0, styleCount: 0, buckets: createBuckets() },
        Domain: { classNameCount: 0, styleCount: 0, buckets: createBuckets() },
      },
      perComponent: {},
    };
  }

  const snapshot: TelemetrySnapshot = {
    enabled: state.enabled,
    totals: { ...state.totals },
    perZone: {
      Foundation: { ...state.perZone.Foundation, buckets: { ...state.perZone.Foundation.buckets } },
      Composition: {
        ...state.perZone.Composition,
        buckets: { ...state.perZone.Composition.buckets },
      },
      Domain: { ...state.perZone.Domain, buckets: { ...state.perZone.Domain.buckets } },
    },
    perComponent: {},
  };

  for (const [key, value] of Object.entries(state.perComponent)) {
    snapshot.perComponent[key] = {
      zone: value.zone,
      classNameCount: value.classNameCount,
      styleCount: value.styleCount,
      buckets: { ...value.buckets },
    };
  }

  return snapshot;
};

export const resetTelemetry = (): void => {
  if (!isDev()) return;

  state.enabled = false;
  state.totals.classNameCount = 0;
  state.totals.styleCount = 0;

  for (const zone of Object.keys(state.perZone) as TelemetryZone[]) {
    state.perZone[zone].classNameCount = 0;
    state.perZone[zone].styleCount = 0;
    for (const bucket of bucketOrder) {
      state.perZone[zone].buckets[bucket] = 0;
    }
  }

  for (const key of Object.keys(state.perComponent)) {
    delete state.perComponent[key];
  }
};
