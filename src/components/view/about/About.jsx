"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FiCode, FiUser } from "react-icons/fi";
import { handleCardMouseMove } from "@/utils";
import { SectionHeading } from "@/components";

export default function About() {
  const containerRef = useRef(null);

  const stats = [
    { label: "Impact Delivered", value: "65% Performance Gain" },
    { label: "Business Domains", value: "FinTech, E-Comm, Enterprise" },
    { label: "Career Span", value: "4.5+ Years" },
    { label: "Learning Growth", value: "From Developer to Architect" },
  ];

  return (
    <section id="about" ref={containerRef}>
      <div className="container-lg">
        {/* Section Heading */}
        <SectionHeading subtitle="Bridging the gap between design vision, user experience, and high-performance frontend architecture.">
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
                  I&apos;m a <strong>Full-Stack Frontend Engineer</strong> specializing in
                  high-performance, scalable systems for enterprise environments. Over
                  4.5+ years, I&apos;ve engineered production-grade applications across{" "}
                  <strong>FinTech, E-Commerce, and Enterprise Access Management</strong>,
                  consistently delivering measurable business outcomes with{" "}
                  <strong>React, Next.js, TypeScript, and Node.js</strong>.
                </p>
                <p>
                  Currently working on IAM solutions at{" "}
                  <strong>Mercedes-Benz R&D (via Capgemini)</strong> handling enterprise
                  compliance at scale. Recent contributions:{" "}
                  <strong>65% performance optimization</strong> through code-splitting and
                  API orchestration; collaborating on{" "}
                  <strong>30-40% team efficiency gains</strong> while learning from
                  architectural leadership; systems handling millions of transactions with
                  zero downtime.
                </p>
                <p>
                  <strong>Engineering philosophy:</strong> Backend thinking meets frontend
                  execution. I build modular, battle-tested systems that scale while
                  continuously learning from senior architects. Every decision is
                  metrics-driven—Lighthouse scores, bundle size, user engagement, business
                  impact. Background in <strong>Mechanical Engineering (BPUT)</strong>{" "}
                  means I think in systems and complexity. The goal: pragmatic excellence
                  and continuous growth.
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
                  Code that compiles is table stakes. I deliver systems that scale.
                  Modular architecture, battle-tested patterns, accessible interfaces. I
                  obsess over metrics—performance, user behavior, business outcomes. The
                  goal isn&apos;t code perfection; it&apos;s shipping products that create
                  real value and grow with you.
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
