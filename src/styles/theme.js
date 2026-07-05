export const universalPalette = {
  light: {
    bg: "#f8f9fa",
    surface: "#ffffff",
    text: "#1f2937",
    muted: "#4b5563",
    accent: "#0284c7",
    accentSoft: "#38bdf8",
    danger: "#dc2626",
  },
  dark: {
    bg: "#121212",
    surface: "#1e1e1e",
    text: "#e0e0e0",
    muted: "#b0b8c6",
    accent: "#38bdf8",
    accentSoft: "#7dd3fc",
    danger: "#f87171",
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
      color: "blue",
    },
  },
};

const darkTheme = {
  button: {
    defaultProps: {
      color: "cyan",
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
