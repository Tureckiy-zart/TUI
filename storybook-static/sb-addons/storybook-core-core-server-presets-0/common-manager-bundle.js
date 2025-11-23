try {
  (() => {
    var S = __STORYBOOK_API__,
      {
        ActiveTabs: T,
        Consumer: h,
        ManagerContext: O,
        Provider: P,
        RequestResponseError: M,
        addons: u,
        combineParameters: g,
        controlOrMetaKey: v,
        controlOrMetaSymbol: A,
        eventMatchesShortcut: j,
        eventToShortcut: x,
        experimental_MockUniversalStore: R,
        experimental_UniversalStore: C,
        experimental_requestResponse: U,
        experimental_useUniversalStore: w,
        isMacLike: B,
        isShortcutTaken: E,
        keyToSymbol: I,
        merge: K,
        mockChannel: N,
        optionOrAltSymbol: G,
        shortcutMatchesShortcut: L,
        shortcutToHumanString: Y,
        types: q,
        useAddonState: D,
        useArgTypes: F,
        useArgs: H,
        useChannel: V,
        useGlobalTypes: z,
        useGlobals: J,
        useParameter: Q,
        useSharedState: W,
        useStoryPrepared: X,
        useStorybookApi: Z,
        useStorybookState: $,
      } = __STORYBOOK_API__;
    var m = (() => {
        let e;
        return (
          typeof window < "u"
            ? (e = window)
            : typeof globalThis < "u"
              ? (e = globalThis)
              : typeof window < "u"
                ? (e = window)
                : typeof self < "u"
                  ? (e = self)
                  : (e = {}),
          e
        );
      })(),
      c = "tag-filters",
      a = "static-filter";
    u.register(c, (e) => {
      let l = Object.entries(m.TAGS_OPTIONS ?? {}).reduce((o, t) => {
        let [r, d] = t;
        return (d.excludeFromSidebar && (o[r] = !0), o);
      }, {});
      e.experimental_setFilter(a, (o) => {
        let t = o.tags ?? [];
        return (t.includes("dev") || o.type === "docs") && t.filter((r) => l[r]).length === 0;
      });
    });
  })();
} catch (e) {
  console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
