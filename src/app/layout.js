"use client";

import { motion } from "framer-motion";
import "@fontsource/inter";
import { ThemeProvider as MTProvider } from "@material-tailwind/react";

import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { getTheme } from "@/styles/theme";

import "./globals.css";

function MaterialWrapper({ children }) {
  const { theme } = useTheme();

  return <MTProvider value={getTheme(theme)}>{children}</MTProvider>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
          <MaterialWrapper>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </MaterialWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
