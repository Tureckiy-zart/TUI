try {
  (() => {
    var l = __REACT__,
      {
        Children: se,
        Component: ie,
        Fragment: ue,
        Profiler: ce,
        PureComponent: de,
        StrictMode: me,
        Suspense: pe,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: _e,
        cloneElement: be,
        createContext: ye,
        createElement: Se,
        createFactory: Te,
        createRef: fe,
        forwardRef: ke,
        isValidElement: Oe,
        lazy: ve,
        memo: Ce,
        startTransition: Ie,
        unstable_act: Ee,
        useCallback: k,
        useContext: xe,
        useDebugValue: he,
        useDeferredValue: ge,
        useEffect: x,
        useId: Pe,
        useImperativeHandle: Ae,
        useInsertionEffect: Me,
        useLayoutEffect: Re,
        useMemo: Le,
        useReducer: Be,
        useRef: M,
        useState: R,
        useSyncExternalStore: Ne,
        useTransition: De,
        version: Ve,
      } = __REACT__;
    var Fe = __STORYBOOK_API__,
      {
        ActiveTabs: Ge,
        Consumer: Ue,
        ManagerContext: Ke,
        Provider: Ye,
        RequestResponseError: $e,
        addons: h,
        combineParameters: qe,
        controlOrMetaKey: ze,
        controlOrMetaSymbol: Ze,
        eventMatchesShortcut: Je,
        eventToShortcut: Qe,
        experimental_MockUniversalStore: Xe,
        experimental_UniversalStore: et,
        experimental_requestResponse: tt,
        experimental_useUniversalStore: ot,
        isMacLike: rt,
        isShortcutTaken: nt,
        keyToSymbol: lt,
        merge: at,
        mockChannel: st,
        optionOrAltSymbol: it,
        shortcutMatchesShortcut: ut,
        shortcutToHumanString: ct,
        types: L,
        useAddonState: dt,
        useArgTypes: mt,
        useArgs: pt,
        useChannel: _t,
        useGlobalTypes: B,
        useGlobals: g,
        useParameter: bt,
        useSharedState: yt,
        useStoryPrepared: St,
        useStorybookApi: N,
        useStorybookState: Tt,
      } = __STORYBOOK_API__;
    var Ct = __STORYBOOK_COMPONENTS__,
      {
        A: It,
        ActionBar: Et,
        AddonPanel: xt,
        Badge: ht,
        Bar: gt,
        Blockquote: Pt,
        Button: At,
        ClipboardCode: Mt,
        Code: Rt,
        DL: Lt,
        Div: Bt,
        DocumentWrapper: Nt,
        EmptyTabContent: Dt,
        ErrorFormatter: Vt,
        FlexBar: wt,
        Form: Ht,
        H1: jt,
        H2: Wt,
        H3: Ft,
        H4: Gt,
        H5: Ut,
        H6: Kt,
        HR: Yt,
        IconButton: D,
        IconButtonSkeleton: $t,
        Icons: P,
        Img: qt,
        LI: zt,
        Link: Zt,
        ListItem: Jt,
        Loader: Qt,
        Modal: Xt,
        OL: eo,
        P: to,
        Placeholder: oo,
        Pre: ro,
        ProgressSpinner: no,
        ResetWrapper: lo,
        ScrollArea: ao,
        Separator: V,
        Spaced: so,
        Span: io,
        StorybookIcon: uo,
        StorybookLogo: co,
        Symbols: mo,
        SyntaxHighlighter: po,
        TT: _o,
        TabBar: bo,
        TabButton: yo,
        TabWrapper: So,
        Table: To,
        Tabs: fo,
        TabsState: ko,
        TooltipLinkList: w,
        TooltipMessage: Oo,
        TooltipNote: vo,
        UL: Co,
        WithTooltip: H,
        WithTooltipPure: Io,
        Zoom: Eo,
        codeCommon: xo,
        components: ho,
        createCopyToClipboardFunction: go,
        getStoryHref: Po,
        icons: Ao,
        interleaveSeparators: Mo,
        nameSpaceClassNames: Ro,
        resetComponents: Lo,
        withReset: Bo,
      } = __STORYBOOK_COMPONENTS__;
    var G = { type: "item", value: "" },
      U = (o, t) => ({
        ...t,
        name: t.name || o,
        description: t.description || o,
        toolbar: {
          ...t.toolbar,
          items: t.toolbar.items.map((e) => {
            let r = typeof e == "string" ? { value: e, title: e } : e;
            return (
              r.type === "reset" &&
                t.toolbar.icon &&
                ((r.icon = t.toolbar.icon), (r.hideIcon = !0)),
              { ...G, ...r }
            );
          }),
        },
      }),
      K = ["reset"],
      Y = (o) => o.filter((t) => !K.includes(t.type)).map((t) => t.value),
      b = "addon-toolbars",
      $ = async (o, t, e) => {
        (e &&
          e.next &&
          (await o.setAddonShortcut(b, {
            label: e.next.label,
            defaultShortcut: e.next.keys,
            actionName: `${t}:next`,
            action: e.next.action,
          })),
          e &&
            e.previous &&
            (await o.setAddonShortcut(b, {
              label: e.previous.label,
              defaultShortcut: e.previous.keys,
              actionName: `${t}:previous`,
              action: e.previous.action,
            })),
          e &&
            e.reset &&
            (await o.setAddonShortcut(b, {
              label: e.reset.label,
              defaultShortcut: e.reset.keys,
              actionName: `${t}:reset`,
              action: e.reset.action,
            })));
      },
      q = (o) => (t) => {
        let {
            id: e,
            toolbar: { items: r, shortcuts: n },
          } = t,
          c = N(),
          [y, i] = g(),
          a = M([]),
          u = y[e],
          O = k(() => {
            i({ [e]: "" });
          }, [i]),
          v = k(() => {
            let s = a.current,
              m = s.indexOf(u),
              p = m === s.length - 1 ? 0 : m + 1,
              d = a.current[p];
            i({ [e]: d });
          }, [a, u, i]),
          C = k(() => {
            let s = a.current,
              m = s.indexOf(u),
              p = m > -1 ? m : 0,
              d = p === 0 ? s.length - 1 : p - 1,
              _ = a.current[d];
            i({ [e]: _ });
          }, [a, u, i]);
        return (
          x(() => {
            n &&
              $(c, e, {
                next: { ...n.next, action: v },
                previous: { ...n.previous, action: C },
                reset: { ...n.reset, action: O },
              });
          }, [c, e, n, v, C, O]),
          x(() => {
            a.current = Y(r);
          }, []),
          l.createElement(o, { cycleValues: a.current, ...t })
        );
      },
      j = ({ currentValue: o, items: t }) =>
        o != null && t.find((e) => e.value === o && e.type !== "reset"),
      z = ({ currentValue: o, items: t }) => {
        let e = j({ currentValue: o, items: t });
        if (e) return e.icon;
      },
      Z = ({ currentValue: o, items: t }) => {
        let e = j({ currentValue: o, items: t });
        if (e) return e.title;
      },
      J = ({ active: o, disabled: t, title: e, icon: r, description: n, onClick: c }) =>
        l.createElement(
          D,
          { active: o, title: n, disabled: t, onClick: t ? () => {} : c },
          r && l.createElement(P, { icon: r, __suppressDeprecationWarning: !0 }),
          e ? `\xA0${e}` : null,
        ),
      Q = ({
        right: o,
        title: t,
        value: e,
        icon: r,
        hideIcon: n,
        onClick: c,
        disabled: y,
        currentValue: i,
      }) => {
        let a =
            r &&
            l.createElement(P, {
              style: { opacity: 1 },
              icon: r,
              __suppressDeprecationWarning: !0,
            }),
          u = { id: e ?? "_reset", active: i === e, right: o, title: t, disabled: y, onClick: c };
        return (r && !n && (u.icon = a), u);
      },
      X = q(
        ({
          id: o,
          name: t,
          description: e,
          toolbar: { icon: r, items: n, title: c, preventDynamicIcon: y, dynamicTitle: i },
        }) => {
          let [a, u, O] = g(),
            [v, C] = R(!1),
            s = a[o],
            m = !!s,
            p = o in O,
            d = r,
            _ = c;
          (y || (d = z({ currentValue: s, items: n }) || d),
            i && (_ = Z({ currentValue: s, items: n }) || _),
            !_ && !d && console.warn(`Toolbar '${t}' has no title or icon`));
          let W = k(
            (E) => {
              u({ [o]: E });
            },
            [o, u],
          );
          return l.createElement(
            H,
            {
              placement: "top",
              tooltip: ({ onHide: E }) => {
                let F = n
                  .filter(({ type: I }) => {
                    let A = !0;
                    return (I === "reset" && !s && (A = !1), A);
                  })
                  .map((I) =>
                    Q({
                      ...I,
                      currentValue: s,
                      disabled: p,
                      onClick: () => {
                        (W(I.value), E());
                      },
                    }),
                  );
                return l.createElement(w, { links: F });
              },
              closeOnOutsideClick: !0,
              onVisibleChange: C,
            },
            l.createElement(J, {
              active: v || m,
              disabled: p,
              description: e || "",
              icon: d,
              title: _ || "",
            }),
          );
        },
      ),
      ee = () => {
        let o = B(),
          t = Object.keys(o).filter((e) => !!o[e].toolbar);
        return t.length
          ? l.createElement(
              l.Fragment,
              null,
              l.createElement(V, null),
              t.map((e) => {
                let r = U(e, o[e]);
                return l.createElement(X, { key: e, id: e, ...r });
              }),
            )
          : null;
      };
    h.register(b, () =>
      h.add(b, {
        title: b,
        type: L.TOOL,
        match: ({ tabId: o }) => !o,
        render: () => l.createElement(ee, null),
      }),
    );
  })();
} catch (e) {
  console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
