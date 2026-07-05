"use client";

import { motion } from "framer-motion";

export default function Reveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 72, clipPath: "inset(0 0 22% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
