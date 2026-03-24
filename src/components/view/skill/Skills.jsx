"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

import { skillsData } from "@data";

export default function Skills() {
  const containerRef = useRef(null);
  useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="skills" className="section-wrap" ref={containerRef}>
      <div className="mx-auto max-w-7xl 3xl:max-w-[90vw] 4xl:max-w-[91vw] 5xl:max-w-[92vw]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true }}
          className="section-title section-heading section-heading-lg mb-4"
        >
          Skills & Expertise
        </motion.h2>

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6 3xl:gap-8 4xl:grid-cols-8 4xl:gap-10 5xl:grid-cols-10">
          {skillsData.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.04,
                  duration: 0.45,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                whileHover={{ y: -3, rotate: 1 }}
                className="glass-panel group flex flex-col items-center justify-center rounded-2xl p-6 transition-all duration-300"
              >
                <Icon
                  size={36}
                  className="mb-4 transition-transform duration-300 ease-out group-hover:scale-105"
                />

                <p className="text-center text-xs font-semibold uppercase tracking-widest md:text-sm">
                  {skill.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
