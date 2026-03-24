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

export const getTheme = (mode) => (mode === "dark" ? darkTheme : lightTheme);
export const getThemePalette = (mode) =>
  mode === "dark" ? universalPalette.dark : universalPalette.light;
