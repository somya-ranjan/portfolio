"use client";

import { motion } from "framer-motion";

import { ThemeProvider } from "@/context/ThemeContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </ThemeProvider>
  );
}
