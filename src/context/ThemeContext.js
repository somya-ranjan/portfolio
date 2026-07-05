"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_THEME, LOCAL_STORAGE_THEME_KEY, THEME_CYCLE } from "@/constants";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

        if (THEME_CYCLE.includes(saved)) {
          setTheme(saved);
        }
      } catch {
        // Theme persistence is optional; keep the default theme if storage is blocked.
      } finally {
        setIsThemeLoaded(true);
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isThemeLoaded) {
      return;
    }

    document.documentElement.setAttribute("data-theme", theme);

    try {
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    } catch {
      // Ignore storage failures in restricted browsing contexts.
    }
  }, [isThemeLoaded, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
