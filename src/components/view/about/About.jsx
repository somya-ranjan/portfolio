"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FiCode, FiUser } from "react-icons/fi";
import { handleCardMouseMove } from "@/utils";
import { SectionHeading } from "@/components";

export default function About() {
  const containerRef = useRef(null);

  const stats = [
    { label: "Performance Gain", value: "65% Faster Load" },
    { label: "Domains", value: "FinTech, E-Commerce, IAM" },
    { label: "Experience", value: "4.5+ Years" },
    { label: "Core Stack", value: "React, Next.js, TypeScript" },
  ];

  return (
    <section id="about" ref={containerRef}>
      <div className="container-lg">
        {/* Section Heading */}
        <SectionHeading subtitle="Engineering scalable web applications with React, Next.js, and TypeScript.">
          About Me
        </SectionHeading>

        {/* Rows Container */}
        <div className="space-y-8 3xl:space-y-12 4xl:space-y-16">
          {/* Row 1: My Story (Full Width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div onMouseMove={handleCardMouseMove} className="card-lg">
              <div className="flex items-center gap-3 mb-6 3xl:mb-8">
                <div className="p-3 rounded-xl bg-[var(--accent-solid)]/10 text-[var(--accent-soft)]">
                  <FiUser size={24} />
                </div>
                <h3 className="text-2xl font-bold 3xl:text-3xl 4xl:text-4xl">My Story</h3>
              </div>

              <div className="space-y-4 text-sm md:text-base leading-relaxed opacity-85 3xl:text-lg 4xl:text-xl 3xl:space-y-6">
                <p>
                  I build web applications with React, Next.js, TypeScript, and Node.js.
                  My experience spans 4.5+ years across FinTech, E-Commerce, and Identity
                  Access Management (IAM). Every project prioritizes runtime performance
                  and system stability.
                </p>
                <p>
                  Currently building IAM solutions at{" "}
                  <strong>Mercedes-Benz R&D via Capgemini</strong>. Optimized frontend
                  architecture with code-splitting and API orchestration. Cut initial load
                  times by 65%. Maintained zero downtime across high-volume authentication
                  flows.
                </p>
                <p>
                  <strong>Engineering approach:</strong> I structure frontend codebases
                  with systems engineering discipline. Every technical decision targets
                  hard metrics like bundle size, Core Web Vitals, and API latency. I hold
                  a Mechanical Engineering degree from <strong>BPUT</strong>. My focus is
                  shipping clean, maintainable production software.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Row 2: Technical Philosophy & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: Technical Philosophy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex w-full"
            >
              <div
                onMouseMove={handleCardMouseMove}
                className="card-sm rounded-2xl flex flex-col justify-center w-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-[var(--accent-solid)]/10 text-[var(--accent-soft)]">
                    <FiCode size={20} />
                  </div>
                  <h4 className="text-lg font-bold 3xl:text-xl 4xl:text-2xl">
                    Technical Philosophy
                  </h4>
                </div>
                <p className="text-xs md:text-sm leading-relaxed opacity-75 3xl:text-base 4xl:text-lg">
                  Functional code is the baseline. Production code must scale and stay
                  maintainable. I build modular interfaces backed by strict TypeScript
                  types and automated tests. I measure success by bundle weight, render
                  speed, and user error rates.
                </p>
              </div>
            </motion.div>

            {/* Right: Stats Sub-grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex w-full"
            >
              <div className="grid grid-cols-2 gap-4 h-full w-full">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    onMouseMove={handleCardMouseMove}
                    className="card-sm h-full flex flex-col justify-center"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <span className="text-xs uppercase tracking-[0.14em] opacity-60 3xl:text-sm 4xl:text-base block">
                      {stat.label}
                    </span>
                    <span className="text-sm md:text-base font-semibold mt-2 text-[var(--text)] 3xl:text-lg 4xl:text-xl block">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
