"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const cards = [
  {
    title: "Performance First",
    text: "Lighthouse-driven frontends with measurable speed and consistency.",
  },
  {
    title: "Pixel Precision",
    text: "Design systems translated into clean, maintainable React architecture.",
  },
  {
    title: "Product Thinking",
    text: "From prototype to production with a focus on outcomes and UX quality.",
  },
];

function FloatingCard({ item, index, progress }) {
  const y = useTransform(progress, [0, 1], [index * 22, -index * 26]);

  return (
    <motion.article
      style={{ y }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      viewport={{ once: true, margin: "0px 0px -120px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="glass-panel rounded-3xl p-6"
    >
      <h3 className="display-title text-2xl font-semibold md:text-3xl">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed opacity-80 md:text-base">
        {item.text}
      </p>
    </motion.article>
  );
}

export default function ShowcaseParallax() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-20 md:pb-44 md:pt-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] opacity-70">
            Premium Experience
          </p>
          <h2 className="section-title mt-5 text-4xl font-semibold md:text-7xl">
            Crafted Like
            <br />A Product Launch
          </h2>
          <p className="mt-7 max-w-xl text-sm leading-relaxed opacity-80 md:text-base">
            A modern, motion-driven layout inspired by flagship product pages.
            Every block is intentionally spaced, animated, and optimized to tell
            your story with clarity.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {cards.map((item, index) => (
              <FloatingCard
                key={item.title}
                item={item}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative z-20 mx-auto w-full max-w-md"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute -left-6 top-3 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(83,126,255,0.34),transparent_70%)] blur-2xl md:-left-14 md:h-36 md:w-36 md:blur-3xl" />
          <div className="absolute -right-5 bottom-5 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(0,210,187,0.32),transparent_70%)] blur-2xl md:-right-10 md:h-28 md:w-28 md:blur-3xl" />

          <div className="glass-panel rounded-[2.25rem] border border-white/20 bg-white/8 p-3 shadow-[0_22px_54px_rgba(10,24,72,0.34)]">
            <Image
              src="/demo-showcase.svg"
              alt="Premium section visual"
              width={960}
              height={1200}
              className="h-auto w-full rounded-[1.8rem]"
            />
          </div>

          <p className="mt-4 text-center text-xs uppercase tracking-[0.22em] opacity-65">
            Demo visual - replace with your photo later
          </p>
        </motion.div>
      </div>
    </section>
  );
}
