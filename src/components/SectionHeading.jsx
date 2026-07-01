"use client";

import { motion } from "framer-motion";

/**
 * Reusable animated section heading powered by framer-motion.
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.className - Extra CSS classes.
 * @param {boolean} props.useDefaultClasses - If true, adds default portfolio section header styles.
 */
export default function SectionHeading({
  children,
  className = "",
  useDefaultClasses = true,
  subtitle = "",
  subtitleClassName = "",
}) {
  const baseClasses = useDefaultClasses ? "section-title section-heading" : "";

  return (
    <div className="flex flex-col items-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className={`${baseClasses} ${className}`}
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          viewport={{ once: true }}
          className={`text-sm opacity-75 max-w-2xl mx-auto 3xl:max-w-4xl 3xl:text-base 4xl:max-w-5xl 4xl:text-lg 5xl:max-w-6xl ${
            subtitleClassName || "mt-4 mb-16"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
