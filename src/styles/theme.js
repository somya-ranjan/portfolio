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
