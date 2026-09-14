export const universalPalette = {
  light: {
    bg: "#f8fafc",
    surface: "#ffffff",
    text: "#09090b",
    muted: "#64748b",
    accent: "#059669",
    accentSoft: "#10b981",
    danger: "#ef4444",
  },
  dark: {
    bg: "#09090b",
    surface: "#101013",
    text: "#fafafa",
    muted: "#a1a1aa",
    accent: "#38e062",
    accentSoft: "#38e062",
    danger: "oklch(0.704 0.191 22.216)",
  },
  minimal: {
    bg: "#ece8dc",
    surface: "#fbf8ef",
    text: "#121212",
    muted: "#3d3d3d",
    accent: "#101010",
    accentSoft: "#4c4c4c",
    danger: "#2f2f2f",
  },
};

const lightTheme = {
  button: {
    defaultProps: {
      color: "green",
    },
  },
};

const darkTheme = {
  button: {
    defaultProps: {
      color: "green",
    },
  },
};

const minimalTheme = {
  button: {
    defaultProps: {
      color: "gray",
    },
  },
};

export const getTheme = (mode) => {
  if (mode === "dark") {
    return darkTheme;
  }

  if (mode === "minimal") {
    return minimalTheme;
  }

  return lightTheme;
};

export const getThemePalette = (mode) => {
  if (mode === "dark") {
    return universalPalette.dark;
  }

  if (mode === "minimal") {
    return universalPalette.minimal;
  }

  return universalPalette.light;
};
