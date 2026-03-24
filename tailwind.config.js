/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
      "5xl": "3840px",
    },
    extend: {
      colors: {
        skin: {
          bg: "var(--bg)",
          soft: "var(--bg-soft)",
          surface: "var(--surface)",
          text: "var(--text)",
          muted: "var(--muted)",
          border: "var(--border)",
          accent: "var(--accent-solid)",
          danger: "var(--danger)",
        },
      },
    },
  },
  plugins: [],
};
