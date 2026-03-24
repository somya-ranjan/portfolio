"use client";

import { motion } from "framer-motion";
import { Cormorant_Garamond, Sora } from "next/font/google";
import { ThemeProvider as MTProvider } from "@material-tailwind/react";

import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { getTheme } from "@/styles/theme";

import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const bodyFont = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

function MaterialWrapper({ children }) {
  const { theme } = useTheme();

  return <MTProvider value={getTheme(theme)}>{children}</MTProvider>;
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
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
