try {
  (() => {
    var k = __STORYBOOK_API__,
      {
        ActiveTabs: S,
        Consumer: b,
        ManagerContext: T,
        Provider: f,
        RequestResponseError: h,
        addons: n,
        combineParameters: P,
        controlOrMetaKey: E,
        controlOrMetaSymbol: M,
        eventMatchesShortcut: O,
        eventToShortcut: A,
        experimental_MockUniversalStore: v,
        experimental_UniversalStore: R,
        experimental_requestResponse: j,
        experimental_useUniversalStore: I,
        isMacLike: g,
        isShortcutTaken: x,
        keyToSymbol: C,
        merge: U,
        mockChannel: D,
        optionOrAltSymbol: N,
        shortcutMatchesShortcut: B,
        shortcutToHumanString: K,
        types: V,
        useAddonState: q,
        useArgTypes: G,
        useArgs: L,
        useChannel: Y,
        useGlobalTypes: $,
        useGlobals: H,
        useParameter: Q,
        useSharedState: w,
        useStoryPrepared: z,
        useStorybookApi: F,
        useStorybookState: J,
      } = __STORYBOOK_API__;
    var e = "storybook/links",
      i = { NAVIGATE: `${e}/navigate`, REQUEST: `${e}/request`, RECEIVE: `${e}/receive` };
    n.register(e, (o) => {
      o.on(i.REQUEST, ({ kind: u, name: d }) => {
        let m = o.storyId(u, d);
        o.emit(i.RECEIVE, m);
      });
    });
  })();
} catch (e) {
  console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
