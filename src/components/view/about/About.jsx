"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FiCode, FiUser } from "react-icons/fi";

export default function About() {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const yVal = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${yVal}px`);
  };

  const stats = [
    { label: "Experience", value: "4.5+ Years" },
    { label: "Current Focus", value: "Enterprise Access Management" },
    { label: "Core Stack", value: "React & Next.js" },
    { label: "Background", value: "B.Tech Mechanical (BPUT)" },
  ];

  return (
    <section id="about" className="section-wrap" ref={containerRef}>
      <div className="mx-auto max-w-7xl 3xl:max-w-[90vw] 4xl:max-w-[91vw] 5xl:max-w-[92vw]">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true }}
          className="section-title section-heading section-heading-lg mb-4"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-sm opacity-75 max-w-xl mx-auto mb-16"
        >
          Bridging the gap between design vision, user experience, and high-performance
          frontend architecture.
        </motion.p>

        {/* Rows Container */}
        <div className="space-y-8">
          {/* Row 1: My Story (Full Width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div
              onMouseMove={handleMouseMove}
              className="glass-panel glow-card rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-[var(--accent-solid)]/10 text-[var(--accent-soft)]">
                  <FiUser size={24} />
                </div>
                <h3 className="text-2xl font-bold">My Story</h3>
              </div>

              <div className="space-y-4 text-sm md:text-base leading-relaxed opacity-85">
                <p>
                  I am a passionate <strong>Frontend Product Engineer</strong>{" "}
                  specializing in building high-performance, fluid, and scalable web
                  applications. Over the past 4.5+ years, I have engineered premium user
                  experiences across diverse domains, including FinTech, E-Commerce, and
                  Headless CMS platforms, using{" "}
                  <strong>React, Next.js, and TypeScript</strong>.
                </p>
                <p>
                  Currently, I am a{" "}
                  <strong>
                    Consultant at Mercedes-Benz Research & Development India
                  </strong>
                  . In this role, I lead the development of global, compliance-aligned
                  Access Management applications. My focus centers on building secure
                  frontend systems, optimizing API orchestration, leveraging Micro
                  Frontends, and designing fluid micro-interactions, successfully driving
                  a 65% boost in system performance.
                </p>
                <p>
                  Driven by performance-oriented design, I focus on writing clean,
                  scalable frontend architectures.{" "}
                  <span className="opacity-60 text-xs block mt-2">
                    Note: I originally transitioned into software engineering from a
                    background in Mechanical Engineering (B.Tech from BPUT), which gave me
                    a strong analytical foundation in complex system design.
                  </span>
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
                onMouseMove={handleMouseMove}
                className="glass-panel glow-card rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center w-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-[var(--accent-solid)]/10 text-[var(--accent-soft)]">
                    <FiCode size={20} />
                  </div>
                  <h4 className="text-lg font-bold">Technical Philosophy</h4>
                </div>
                <p className="text-xs md:text-sm leading-relaxed opacity-75">
                  I believe code should not only compile but also feel alive. Fluid
                  micro-interactions, clean state management, modular architecture, and
                  high accessibility are the cornerstones of my engineering approach.
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
                    className="glass-panel p-5 rounded-2xl flex flex-col justify-between h-full"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <span className="text-xs uppercase tracking-[0.14em] opacity-60">
                      {stat.label}
                    </span>
                    <span className="text-sm md:text-base font-semibold mt-2 text-[var(--text)]">
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
