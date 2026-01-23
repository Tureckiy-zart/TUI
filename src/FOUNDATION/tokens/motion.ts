export const durations = {
  instant: "0ms",
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
  slower: "700ms",
  slowest: "1000ms",
};

export const easings = {
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  elastic: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
};

export const transitions = {
  fast: `${durations.fast} ${easings.out}`,
  normal: `${durations.normal} ${easings.inOut}`,
  slow: `${durations.slow} ${easings.inOut}`,
  bounce: `${durations.normal} ${easings.bounce}`,
  elastic: `${durations.slow} ${easings.elastic}`,
};

export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  slideInUp: {
    from: { transform: "translateY(100%)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
  slideInDown: {
    from: { transform: "translateY(-100%)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
  slideInLeft: {
    from: { transform: "translateX(-100%)", opacity: 0 },
    to: { transform: "translateX(0)", opacity: 1 },
  },
  slideInRight: {
    from: { transform: "translateX(100%)", opacity: 0 },
    to: { transform: "translateX(0)", opacity: 1 },
  },
  scaleIn: {
    from: { transform: "scale(0.95)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
  },
  scaleOut: {
    from: { transform: "scale(1)", opacity: 1 },
    to: { transform: "scale(0.95)", opacity: 0 },
  },
  spin: {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
  pulse: {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0.5 },
  },
  bounce: {
    "0%, 100%": {
      transform: "translateY(-25%)",
      animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
    },
    "50%": { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" },
  },
};
